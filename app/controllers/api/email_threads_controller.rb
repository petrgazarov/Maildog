class Api::EmailThreadsController < ApplicationController
  def show
    @email_thread = EmailThread.find(params[:id])
    @emails = Email.includes(:sender, :addressees).where(email_thread_id: params[:id])
                   .order(date: :asc, time: :asc)

    render :show
  end

  def destroy
    email = Email.find(params[:id])
    if email.original_email_id
      emails = Email.where(
        "original_email_id = ? OR id = ?",
        email.original_email_id, email.original_email_id
      ).update_all(trash: true)
    else
      emails = Email.where(original_email_id: email.id).update_all(trash: true)
      email.update(trash: true)
    end

    render json: {}
  end

  def sent
    @threads = EmailThread.joins(:emails)
                          .where(owner_id: current_user_contact.id)
                          .where("emails.sender_id = #{current_user_contact.id}")
                          .where("emails.draft = false")
    render :index
  end

  def drafts
    @threads = EmailThread.joins(:emails)
                          .where(owner_id: current_user_contact.id)
                          .where("emails.draft = true")

    render :drafts
  end

  def inbox
    @threads = EmailThread
      .includes(emails: [:sender, :addressees])
      .where(owner_id: current_user_contact.id)
      .joins(:emails)
      .joins("INNER JOIN email_addressees ON emails.id = email_addressees.email_id")
      .where("email_addressees.addressee_id = #{current_user_contact.id}")
      .where("emails.draft = false")

    render :index
  end
end
