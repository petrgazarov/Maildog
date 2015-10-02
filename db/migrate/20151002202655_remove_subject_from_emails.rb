class RemoveSubjectFromEmails < ActiveRecord::Migration
  def change
    remove_column :emails, :subject, :text
  end
end
