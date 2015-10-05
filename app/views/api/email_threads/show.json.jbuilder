json.extract! @email_thread, :subject, :id, :checked

json.emails do
  json.array! @emails do |email|
    json.partial! "api/emails/email", email: email
  end
end

json.labels do
  json.array! @email_thread.labels do |label|
    json.partial! "api/labels/label", label: label 
  end
end
