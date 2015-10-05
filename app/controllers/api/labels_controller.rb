class Api::LabelsController < ApplicationController
  def index
    if params[:email_thread_id]
      thread = EmailThread.find(params[:email_thread_id])

      @labels = Label.joins(:threads)
                     .where("email_threads.id = #{thread.id}")
    else
      @labels = current_user_contact.labels
    end

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

  def threads
    @threads = EmailThread
                .includes(emails: [:sender, :addressees])
                .joins(:thread_labels)
                .joins("INNER JOIN labels ON thread_labels.label_id = labels.id")
                .where("labels.id = #{params[:id]}")

    render template: "api/email_threads/index"
  end

  def destroy
    if params[:email_thread_id]
      EmailThread.where({
        email_thread_id: params[:email_thread_id],
        label_id: params[:id]
        }).destroy
    else
      label = Label.find(params[:id])
      label.destroy
      render json: {}
    end
  end
end
