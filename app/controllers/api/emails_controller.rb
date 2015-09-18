class Api::EmailsController < ApplicationController
  def create
    @email = current_user.emails.new(email_params)

    contact = Contact.create_or_get(params[:addressees][:email])
    save_contact_if_new(contact)

    email_addressee = @email.addressees.new(
      email_type: params[:addressees][:email_type],
      addressee_id: contact.id
    )

    if @email.save
      email_addressee.save!
      MaildogMailer.send_email(contact, @email).deliver
      render json: @email
    else
      render json: @email.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @email = Email.find(params[:id])
    if @email.original_email_id
      @original_email = Email.find(@email.original_email_id)
    else
      @original_email = @email
    end

    render :show
  end

  def index
    render json: Email.all
  end

  def inbox
    @emails = Email.all
    render :inbox
  end

  def thread
    email = Email.find(params[:id])
    if email.original_email_id
      @emails = Email.where(original_email_id: email.original_email_id)
    else
      @emails = Email.where(original_email_id: email.id).push(email)
    end
    render json: @emails
  end

  private

  def save_contact_if_new(contact)
    if !contact.owner
      contact.owner = current_user
      contact.save!
    end
  end

  def email_params
    params.require(:email).permit(:subject, :body, :parent_email_id)
  end
end
