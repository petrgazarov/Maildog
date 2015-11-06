json.total_count @search_results.total_count

json.results do
  json.array! @search_results do |search_result|
    if search_result.searchable_type == "Email"
      email = search_result.searchable
      # make sure the threads belong to current user
      next if email.thread.owner_id != @current_user_contact.id
      # don't send threads that are trash or draft
      next if email.trash || email.draft

      json.extract! email.thread, :subject, :id, :checked
      json._type "EmailThread"

      json.tail do
        json.partial! "api/emails/email", email: email
        json._type "Email"
      end

      json.trashCount search_result.searchable.thread.trash_count
      json.nonTrashCount search_result.searchable.thread.non_trash_count
    end
  end
end
