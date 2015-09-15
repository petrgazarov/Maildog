class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if !@user.save
      flash.now[:errors] = @user.errors
    end

    render json: @user
  end
end
