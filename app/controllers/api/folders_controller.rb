class Api::FoldersController < ApplicationController
  def index
    @folders = current_user_contact.folders
    render :index
  end

  def create

  end

  def update

  end

  def destroy

  end
end
