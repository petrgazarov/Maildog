json.array! @emails do |email|
  json.partial! 'email', email: email
  json.receivers do
    json.array! email.addressees, do |addressee|
      json.extract! addressee, :first_name, :last_name, :email
    end
  end
end
