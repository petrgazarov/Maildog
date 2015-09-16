class UsersController < ApplicationController
  before_action :redirect_current_user

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if !@user.save
      flash.now[:errors] = @user.errors.full_messages
      render :new
    else
      log_in!(@user)
      redirect_to root_url
    end
  end

  def user_params
    params.require(:user).permit(:username, :password, :first_name, :last_name)
  end
end
