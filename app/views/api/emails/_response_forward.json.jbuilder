json.extract! email, :id, :subject, :body, :time, :date
json.sender do
  json.extract! email.sender, :first_name, :last_name
end

if !email.responses_forwards.empty?
  json.responses_forwards do
    json.array! email.responses_forwards do |response_forward|
      json.partial! 'response_forward',
        email: response_forward
    end
  end
end
