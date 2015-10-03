json.array! @threads do |thread|
  json.extract! thread, :subject, :id

  json.tail do
    email = thread.emails.sort_by { |email| [email.date, email.time] }.last

    json.partial! "api/emails/email", email: email
  end
end
