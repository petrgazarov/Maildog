json.array! @emails do |email|
  json.partial! "api/emails/email", email: email
end
# json.email_labels do
#   json.array! @emails do |email|
#     json.extract! email.labels, :id
#   end
# end
