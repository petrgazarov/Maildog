class Api::SessionsController < ApplicationController
  def fetch
    @user = User.find_by(username: params[:user][:username])
    if @user.nil?
      render json: {}
    else
      render :fetch
    end
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      log_in!(@user)
      render json: @user
    else
      render json: {}, status: :unprocessable_entity
    end
  end
end
