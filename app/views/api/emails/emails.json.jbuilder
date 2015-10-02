json.array! @emails do |email|
  json.partial! 'api/emails/email', email: email
end
