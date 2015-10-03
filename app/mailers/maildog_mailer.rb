class MaildogMailer < ApplicationMailer
  default :from => 'admin@example.com'

  def send_email(contact, email, thread)
    @email = email

    mail(
      to: contact.email,
      subject: thread.subject,
      from: @email.sender.email
      )
    end
end
