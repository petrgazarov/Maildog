json.extract! email, :id, :subject, :body, :time, :date, :starred, :checked
json.sender do
  json.extract! email.sender, :first_name, :last_name, :email
end
json.addressees do
  json.array! email.addressees do |addressee|
    json.extract! addressee, :first_name, :last_name, :email
  end
end
