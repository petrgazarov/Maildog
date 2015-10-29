class Api::EmailThreadsController < ApplicationController
  def show
    @email_thread = EmailThread.includes(:labels).find(params[:id])
    @emails = Email.includes(:sender, :addressees)
                   .where(email_thread_id: params[:id])
                   .order(time: :asc)

    render :show
  end

  def destroy
    thread = EmailThread.where(id: params[:email_thread_ids]).destroy_all

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
                
    @drafts = true
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
    render :trash
  end

  def search
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .page(params[:page])
    @current_user_contact = current_user_contact

    render :search
  end

  def labels
    thread = EmailThread.find(params[:id])

    @labels = Label.joins(:threads)
                   .where("email_threads.id = #{thread.id}")

    render template: "api/labels/index"
  end

  def move_to_trash
    Email.where(email_thread_id: params[:email_thread_ids])
                                  .update_all(trash: true)
    EmailThread.where(id: params[:email_thread_ids])
                                  .update_all(checked: false)

    render json: {}
  end

  def recover
    Email.where(email_thread_id: params[:email_thread_ids])
                                  .update_all(trash: false)
    EmailThread.where(id: params[:email_thread_ids])
                                  .update_all(checked: false)

    render json: {}
  end

  def discard_drafts
    Email.where(
      email_thread_id: params[:email_thread_ids], draft: true
    ).destroy_all

    EmailThread.where(id: params[:email_thread_ids]).update_all(checked: false)

    render json: {}
  end

  private

  def thread_params
    params.require(:email_thread).permit(:checked, :subject)
  end
end
