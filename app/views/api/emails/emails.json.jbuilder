json.array! @emails do |email|
  json.partial! 'email', email: email
end
