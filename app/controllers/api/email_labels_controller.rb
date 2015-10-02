class Api::EmailLabelsController < ApplicationController
  def create
    @email_label = EmailLabel.new(label_params)
    if @email_label.save
      render json: @email_label
    else
      render json: @email.errors.full_messages
    end
  end

  private

  def label_params
    params.require(:email_label).permit(:label_id, :email_id)
  end
end
