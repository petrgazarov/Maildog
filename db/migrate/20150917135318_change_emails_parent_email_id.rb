class ChangeEmailsParentEmailId < ActiveRecord::Migration
  def change
    rename_column :emails, :parent_email_id, :original_email_id
  end
end
