class AddParentEmailIdToEmails < ActiveRecord::Migration
  def change
    add_column :emails, :parent_email_id, :integer
  end
end
