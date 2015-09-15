class SessionsController < ApplicationController
  before_action :require_user!, only: [:destroy]

  def new
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      log_in!(@user)
    else
      flash.now[:errors] = ['bad username/password combo']
    end

    render json: @user
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to new_session_url
  end
end
