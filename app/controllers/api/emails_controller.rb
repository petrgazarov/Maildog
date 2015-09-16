class Api::EmailsController < ApplicationController
  def create
    @email = current_user.emails.new(email_params)

    contact = Contact.create_or_get(params[:addressees][:email])
    if !contact.owner
      contact.owner = current_user
      contact.save!
    end

    email_addressee = @email.addressees.new(
      email_type: params[:addressees][:email_type],
      addressee_id: contact.id
    )

    if @email.save
      email_addressee.save!
      render json: @email
    else
      debugger
      render json: @email.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @email = Email.find(params[:id])
    render json: @email
  end

  def index
    render json: Email.all
  end

  def inbox
    render json: Email.all
  end

  private

  def email_params
    params.require(:email).permit(:subject, :body, :parent_email_id)
  end
end
