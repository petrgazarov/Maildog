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
    elsif @email.changed_star_or_trash(
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

  def save_contact_if_new(contact)
    if !contact.owner
      contact.owner = current_user
      contact.save!
    end
  end

  def save_email(email)
    createOrSetThread(email)

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
    createOrSetThread(email)

    email.time = DateTime.now.in_time_zone

    if (action == :update && email.update!(email_params)) ||
         (action == :create && email.save!)

      EmailThread.find(email.email_thread_id).update!(subject: email.subject)
      email_addressee.save!
      MaildogMailer.send_email(contact, email, current_user_contact).deliver
      render :show
    else
      render json: email.errors.full_messages, status: :unprocessable_entity
    end
  end

  def createOrSetThread(email)
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
    save_contact_if_new(contact)

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
