class Api::EmailsController < ApplicationController
  def create
    @email = @email = current_user_contact.written_emails.new(email_params)
    if @email.draft_email
      save_email(@email)
    else
      save_and_send_email(@email)
    end
  end

  def update
    @email = Email.find(params[:id])
    if params[:email][:draft_email]
      update_email(@email)
      render json: @email
    else
      update_and_send_email(@email)
      render json: @email.errors.full_messages, status: :unprocessable_entity
    end
  end

  def inbox
    @emails = current_user_contact.received_emails.order(date: :desc, time: :desc)
    render :emails_with_sender
  end

  def sent
    @emails = current_user_contact.written_emails.order(date: :desc, time: :desc)
                                  .where(draft_email: false)
    render :emails_with_addressees
  end

  def drafts
    @emails = current_user_contact.written_emails.order(date: :desc, time: :desc)
                                  .where(draft_email: true);
    render :emails_with_addressees
  end

  private

  def save_contact_if_new(contact)
    if !contact.owner
      contact.owner = current_user
      contact.save!
    end
  end

  def email_params
    params.require(:email).permit(
      :id, :subject, :body, :parent_email_id, :original_email_id, :draft
    )
  end

  def save_email(email)
    if email.save
      render json: email
    else
      render json: email.errors.full_messages, status: :unprocessable_entity
    end
  end

  def save_and_send_email(email)
    contact = Contact.create_or_get(params[:addressees][:email])
    save_contact_if_new(contact)

    email_addressee = email.email_addressees.new(
      email_type: params[:addressees][:email_type],
      addressee_id: contact.id
    )
    if email.save
      email_addressee.save!
      MaildogMailer.send_email(contact, email).deliver
      render :show
    else
      render json: email.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update_email(email)
    if email.update(email_params)
      render json: email
    else
      render json: email.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update_and_send_email(email)
    contact = Contact.create_or_get(params[:addressees][:email])
    save_contact_if_new(contact)

    email_addressee = email.email_addressees.new(
      email_type: params[:addressees][:email_type],
      addressee_id: contact.id
    )
    if email.update(email_params)
      email_addressee.save!
      MaildogMailer.send_email(contact, email).deliver
      render :show
    else
      render json: email.errors.full_messages, status: :unprocessable_entity
    end
  end
end
