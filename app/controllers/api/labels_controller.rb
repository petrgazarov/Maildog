class Api::LabelsController < ApplicationController
  def index
    @labels = current_user_contact.labels
    render :index
  end

  def create
    @label = current_user_contact.labels.new(name: params[:label][:name])
    if @label.save
      render json: @label
    else
      render json: @label.errors.full_messages
    end
  end

  def show
    @label = Label.find(params[:id])
    render :show
  end

  def emails
    @emails = Label.find(params[:id]).emails
    render template: "api/emails/emails"
  end

  def destroy
    label = Label.find(params[:id])
    label.destroy
    render json: {}
  end
end
