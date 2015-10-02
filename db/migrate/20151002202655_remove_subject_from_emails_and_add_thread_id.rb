class RemoveSubjectFromEmailsAndAddThreadId < ActiveRecord::Migration
  def change
    remove_column :emails, :subject, :text
    add_column :emails, :thread_id, :integer
  end
end
