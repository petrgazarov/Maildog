json.total_count @search_results.total_count

json.results do
  json.array! @search_results do |search_result|
    if search_result.searchable_type == "Email"
      next if search_result.searchable.thread.owner_id != @current_user_contact.id
      json.extract! search_result.searchable.thread, :subject, :id, :checked
      json._type "EmailThread"

      json.tail do
        json.partial! "api/emails/email", email: search_result.searchable
        json._type "Email"
      end
    end
  end
end
