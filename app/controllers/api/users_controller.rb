class Api::UsersController < ApplicationController
  def show
    render json: current_user
  end

  def create
    @user = User.new(user_params)
    if !@user.save
      render json: @user.errors.full_messages, status: :unprocessable_entity
    else
      log_in!(@user)
      user_contact = @user.contacts.new(user_contact_params)
      user_contact.email = @user.email
      user_contact.save!
      render json: @user
    end
  end

  def user_params
    params.require(:user)
          .permit(:username, :password, :first_name, :last_name, :gender)
  end

  def user_contact_params
    params.require(:user).permit(:first_name, :last_name, :gender)
  end
end
