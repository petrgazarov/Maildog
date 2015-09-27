# json.total_count @search_results.total_count

json.results do
  json.array! @search_results do |search_result|
    if search_result.searchable_type == "Email"
      json.partial! "api/emails/email", email: search_result.searchable
      json._type "Email"
    end
  end
end
