json.extract! @email_thread, :subject, :id, :checked
json.emails do
  json.array! @emails do |email|
    json.partial! "api/emails/email", email: email
  end
end
