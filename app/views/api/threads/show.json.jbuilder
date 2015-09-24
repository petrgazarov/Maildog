json.array! @emails do |email|
  json.extract! email, :id, :subject, :body, :time, :date, :draft
  json.sender do
    json.extract! email.sender, :first_name, :last_name, :email
  end
end
