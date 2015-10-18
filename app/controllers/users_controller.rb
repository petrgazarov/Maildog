class UsersController < ApplicationController
  before_action :redirect_current_user

  def new
    render :new
  end
end
