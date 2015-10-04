json.array! @threads do |thread|
  json.extract! thread, :subject, :id, :checked

  json.tail do
    email = thread.emails.select { |email| email.starred }
                         .sort_by { |email| [email.date, email.time] }.last

    json.partial! "api/emails/email", email: email
  end

  json.count thread.emails.count
end
