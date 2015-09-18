class MaildogMailer < ApplicationMailer
  default :from => 'admin@example.com'

  def send_email(contact)
    mail(
      to: contact.email,
      subject: 'Test email using Sendgrid!'
      )
    end
end
