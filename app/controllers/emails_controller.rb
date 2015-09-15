class EmailsController < ApplicationController
  def create
    @email = current_user.emails.new(email_params)
    params[:addressees].keys.each do |addressee|
      
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
