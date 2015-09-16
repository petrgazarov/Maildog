class SessionsController < ApplicationController
  before_action :require_user!, only: [:destroy]
  before_action :redirect_current_user, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      log_in!(@user)
      redirect_to root_url
    else
      @user = User.new
      flash.now[:errors] = ['bad username/password combo']
      render :new
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to new_session_url
  end
end
