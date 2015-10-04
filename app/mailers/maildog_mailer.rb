class MaildogMailer < ApplicationMailer
  default :from => 'admin@example.com'

  def send_email(contact, email, current_user_contact)
    @email = email

    mail(
      to: contact.email,
      subject: @email.subject,
      from: current_user_contact.email
      )
    end
end
