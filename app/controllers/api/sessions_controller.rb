class Api::SessionsController < ApplicationController
  def show
    if current_user
      render :show
    else
      render json: {}
    end
  end

  def fetch
    @user = User.find_by_username(params[:user][:username])
    if @user.nil?
      render json: {}
    else
      render :fetch
    end
  end

  def create
    user = User.find_by_credentials(
                  params[:user][:username],
                  params[:user][:password])

    if user.nil?
      head :unprocessable_entity
    else
      log_in!(user)
      render :show
    end
  end

  def destroy
    log_out!
    render json: {}
  end
end
