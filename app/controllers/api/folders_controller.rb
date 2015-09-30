class Api::FoldersController < ApplicationController
  def index
    @folders = current_user_contact.folders
    render :index
  end

  def create
    @folder = current_user_contact.folders.new(name: params[:folder][:name])
    if @folder.save
      render json: @folder
    else
      render json: @folder.errors.full_messages
    end
  end

  def destroy
    folder = Folder.find(params[:id])
    folder.destroy
    render json: {}
  end
end
