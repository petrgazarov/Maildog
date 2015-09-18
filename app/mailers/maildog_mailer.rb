class MaildogMailer < ApplicationMailer
  default :from => 'admin@example.com'

  def send_email(contact, email)
    @email = email
    mail(
      to: contact.email,
      subject: @email.subject
      )
    end
end
