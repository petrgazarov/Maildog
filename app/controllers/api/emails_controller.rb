class Api::EmailsController < ApplicationController
  def create
    @email = current_user_contact.written_emails.new(email_params)
    if @email.draft
      save_email(@email)
    else
      persist_and_send_email(:create, @email)
    end
  end

  def update
    @email = Email.find(params[:id])
    (@email.draft = params[:email][:draft]) if !params[:email][:draft].nil?

    if @email.draft
      update_email(@email, true)
    elsif @email.changed_star_or_trash?(
      params[:email][:starred], params[:email][:trash]
      )
      update_email(@email, false)
    else
      persist_and_send_email(:update, @email)
    end
  end

  def destroy
    email = Email.find(params[:id])
    email.destroy
    render json: email
  end

  private

  def save_contact_if_new(contact, user)
    if !contact.persisted?
      if contact.email.include?('@maildog.xyz')
        copy_from_contact = Contact.find_by(email: contact.email)
        contact = copy_from_contact.dup if copy_from_contact
      end
      contact.owner_id = user.id

      contact.save!
    end
    contact
  end

  def save_email(email)
    create_or_set_thread(email)

    if email.save
      render json: email
    else
      render json: email.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update_email(email, update_thread)
    if email.update(email_params)
      if update_thread
        EmailThread.find(email.email_thread_id).update!(subject: email.subject)
      end
      render json: email
    else
      render json: email.errors.full_messages, status: :unprocessable_entity
    end
  end

  def persist_and_send_email(action, email)
    contact, email_addressee = create_or_get_contact_and_email_addressee(email)
    create_or_set_thread(email)

    email.time = DateTime.now.in_time_zone

    if (action == :update && email.update!(email_params)) ||
         (action == :create && email.save!)

      EmailThread.find(email.email_thread_id).update!(subject: email.subject)
      email_addressee.save!
      MaildogMailer.send_email(contact, email, current_user_contact).deliver

      if contact.email.include?('@maildog.xyz') &&
          contact.email != current_user_contact.email
        create_recipient_copy(email, contact)
      end

      render :show
    else
      render json: email.errors.full_messages, status: :unprocessable_entity
    end
  end

  def create_recipient_copy(email, recipient)
    rec_user = User.find_by(email: recipient.email)
    return if rec_user.nil?

    rec_current_user_contact = Contact.create_or_get(
      current_user.email, rec_user, current_user_contact
    )

    rec_current_user_contact = save_contact_if_new(
      rec_current_user_contact, rec_user
    )
    rec_contact = Contact.find_by(email: rec_user.email, owner_id: rec_user.id)

    email = email.dup
    email.parent_email_id = nil
    email.original_email_id = nil
    email.starred = false
    email.sender = rec_current_user_contact

    email_addressee = email.email_addressees.new(
      email_type: params[:email][:addressees][:email_type],
      addressee_id: rec_contact.id
    )
    thread = EmailThread.create!(
        owner_id: rec_contact.id, subject: email.subject
    )
    email.email_thread_id = thread.id

    email_addressee.save! if email.save!
  end

  def create_or_set_thread(email)
    if email.email_thread_id
      thread = EmailThread.find(email.email_thread_id).update!(subject: email.subject)
    else
      thread = EmailThread.create!(
                owner_id: current_user_contact.id, subject: email.subject
      )
      email.email_thread_id = thread.id
    end

    thread
  end

  def create_or_get_contact_and_email_addressee(email)
    contact = Contact.create_or_get(params[:email][:addressees][:email], current_user)
    contact = save_contact_if_new(contact, current_user)

    email_addressee = email.email_addressees.new(
      email_type: params[:email][:addressees][:email_type],
      addressee_id: contact.id
    )
    [contact, email_addressee]
  end

  def email_params
    params.require(:email).permit(
      :body, :parent_email_id, :original_email_id, :subject,
      :draft, :starred, :addressees, :email_thread_id, :trash
    )
  end
end
