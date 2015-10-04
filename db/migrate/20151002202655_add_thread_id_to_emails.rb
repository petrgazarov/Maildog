class AddThreadIdToEmails < ActiveRecord::Migration
  def change
    add_column :emails, :email_thread_id, :integer
  end
end
