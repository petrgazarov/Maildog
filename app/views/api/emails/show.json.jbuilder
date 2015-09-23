json.partial! 'email', email: @email
json.sender do
  json.extract! @email.sender, :first_name, :last_name, :email
end
