class Api::ThreadsController < ApplicationController
  def show
    email = Email.find(params[:id])
    if email.original_email_id
      @emails = Email.where(
        'original_email_id = ? OR id = ?',
        email.original_email_id, email.original_email_id
      ).order(date: :asc, time: :asc).to_a
    else
      @emails = Email.where(
      'original_email_id = ? OR id = ?',
      email.id, email.id
      ).order(date: :asc, time: :asc).to_a
    end

    render :show
  end

  def destroy
    email = Email.find(params[:id])
    if email.original_email_id
      emails = Email.where(
        "original_email_id = ? OR id = ?",
        email.original_email_id, email.original_email_id
      ).destroy_all
    else
      emails = Email.where(original_email_id: email.id).destroy_all
      email.destroy
    end

    render json: emails
  end
end
