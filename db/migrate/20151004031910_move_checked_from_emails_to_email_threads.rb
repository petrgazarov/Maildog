class MoveCheckedFromEmailsToEmailThreads < ActiveRecord::Migration
  def change
    remove_column :emails, :checked, :boolean
    add_column :email_threads, :checked, :boolean, default: false
  end
end
