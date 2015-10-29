json.array! @threads do |thread|
  json.extract! thread, :subject, :id, :checked

  json.tail do
    emails = thread.emails.select { |email| !email.trash }.sort_by { |email| email.time }

    # Select thread tail depending on folder.
    # If it is drafts, the tail should be a draft message.
    # If it is any other folder, the tail should not be a draft message.
    email = nil
    (emails.length - 1).downto(0) do |i|
      if (@drafts && emails[i].draft) || (!@drafts && !emails[i].draft)
        email = emails[i]
        break
      end
    end

    json.partial! "api/emails/email", email: email
  end

  json.trashCount thread.trash_count
  json.nonTrashCount thread.non_trash_count
end
