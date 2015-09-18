class Api::ThreadsController < ApplicationController
  def show
    email = Email.find(params[:id])
    if email.original_email_id
      @emails = Email.order(:created_at).where(
        "original_email_id = ? OR id = ?",
        email.original_email_id, email.original_email_id
      )
    else
      @emails = Email.order(:created_at).where(
      original_email_id: email.id
    ).push(email)
    end

    render :show
  end

  def destroy
    email = Email.find(params[:id])
    if email.original_email_id
      emails = Email.where(
        "original_email_id = ? OR id = ?",
        email.original_email_id, email.original_email_id
      ).destroy
    else
      emails = Email.where(
      original_email_id: email.id
    ).push(email).destroy
    end

    render json: emails
  end
end
