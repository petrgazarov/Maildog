class SessionsController < ApplicationController
  before_action :require_user!, only: [:destroy]
  before_action :redirect_current_user, only: [:new, :create_guest]

  def new
    render :new
  end

  def create_guest
    @user = User.find_by_credentials("barack", "password")
    log_in!(@user)
    redirect_to root_url
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to new_session_url
  end
end
