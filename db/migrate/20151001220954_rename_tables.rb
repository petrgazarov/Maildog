class RenameTables < ActiveRecord::Migration
  def change
    rename_table :folders, :labels
    rename_table :email_folders, :thread_labels
  end
end
