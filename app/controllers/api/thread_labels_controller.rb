class Api::ThreadLabelsController < ApplicationController
  def create
    @thread_label = ThreadLabel.new(thread_label_params)
    if @thread_label.save
      render json: @thread_label
    else
      render json: @thread_label.errors.full_messages
    end
  end

  private

  def thread_label_params
    params.require(:thread_label).permit(:label_id, :thread_id)
  end
end
