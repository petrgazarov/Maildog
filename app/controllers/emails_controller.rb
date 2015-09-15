class EmailsController < ApplicationController
  def create
    @email = current_user.emails.new(email_params)
    params[:addressees].each do |email, type|
      contact = Contact.create_or_get(email)

      email_addressee = @email.addressees.new({
        type: type,
        addressee_id: contact.id
      })
      email_addressee.save!
    end
    if @email.save
      render json: @email
    else
      render json: @email.errors
    end
  end

  def show

  end

  def index

  end

  def email_params
    params.require(:email).permit(:subject, :body, :parent_email_id)
  end
end
