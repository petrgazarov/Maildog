class Api::EmailThreadsController < ApplicationController
  def show
    @email_thread = EmailThread.find(params[:id])
    @emails = Email.includes(:sender, :addressees).where(email_thread_id: params[:id])
                   .order(date: :asc, time: :asc)

    render :show
  end

  def destroy
    thread = EmailThread.find(params[:id]).destroy

    render json: {}
  end

  def update
    thread = EmailThread.find(params[:id])

    if thread.update(thread_params)
      render json: thread
    else
      render json: thread.errors.full_messages
    end
  end

  def inbox
    @threads = EmailThread
      .includes(emails: [:sender, :addressees])
      .where(owner_id: current_user_contact.id)
      .joins(:emails)
      .joins("INNER JOIN email_addressees ON emails.id = email_addressees.email_id")
      .where("email_addressees.addressee_id = #{current_user_contact.id}")
      .where("emails.draft = false")
      .where("emails.trash = false")

    render :index
  end

  def sent
    @threads = EmailThread.includes(emails: [:sender, :addressees])
                .where(owner_id: current_user_contact.id)
                .joins(:emails)
                .where("emails.sender_id = #{current_user_contact.id}")
                .where("emails.draft = false")
                .where("emails.trash = false")
    render :index
  end

  def drafts
    @threads = EmailThread.includes(emails: [:sender, :addressees])
                .where(owner_id: current_user_contact.id)
                .joins(:emails)
                .where("emails.draft = true")
    render :index
  end

  def starred
    @threads = EmailThread.includes(emails: [:sender, :addressees])
                .where(owner_id: current_user_contact.id)
                .joins(:emails)
                .where("emails.starred = true")
                .where("emails.trash = false")
    render :starred
  end

  def trash
    @threads = EmailThread.includes(emails: [:sender, :addressees])
                .where(owner_id: current_user_contact.id)
                .joins(:emails)
                .where("emails.trash = true")
    render :index
  end

  def search
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .page(params[:page])

    render :search
  end

  private

  def thread_params
    params.require(:email_thread).permit(:checked, :subject)
  end
end
