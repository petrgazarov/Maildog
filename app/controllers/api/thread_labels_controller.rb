class Api::ThreadLabelsController < ApplicationController
  def create
    @thread_label = ThreadLabel.new(thread_label_params)
    if @thread_label.save
      render json: @thread_label
    else
      render json: @thread_label.errors.full_messages
    end
  end

  def destroy
    thread_label = ThreadLabel.find_by(
      label_id: params[:thread_label][:label_id],
      email_thread_id: params[:thread_label][:email_thread_id]
    )
    thread_label.destroy

    render json: {}
  end

  private

  def thread_label_params
    params.require(:thread_label).permit(:label_id, :email_thread_id)
  end
end
