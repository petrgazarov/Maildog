class AddTrashToEmails < ActiveRecord::Migration
  def change
    add_column :emails, :trash, :boolean, default: false
  end
end
