class Api::SessionsController < ApplicationController
  def fetch
    @user = User.find_by_username(params[:user][:username])
    if @user.nil?
      render json: {}
    else
      render :fetch
    end
  end
end
