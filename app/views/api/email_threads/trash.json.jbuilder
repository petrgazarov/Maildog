json.array! @threads do |thread|
  json.extract! thread, :subject, :id, :checked

  json.tail do
    email = thread.emails.select { |email| email.trash }
                  .sort_by { |email| email.time }
                  .last

    json.partial! "api/emails/email", email: email
  end

  json.trashCount thread.trash_count
  json.nonTrashCount thread.non_trash_count
end
