json.array! @emails do |email|
  json.extract! email, :id, :subject, :body, :date, :time
  json.sender do
    json.extract! email.sender, :first_name, :last_name
  end
end
