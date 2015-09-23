class ChangeEmailsTableDraftColumnName < ActiveRecord::Migration
  def change
    rename_column :emails, :draft, :draft_email
  end
end
