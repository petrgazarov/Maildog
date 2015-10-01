class RenameTables < ActiveRecord::Migration
  def change
    rename_table :folders, :labels
    rename_table :email_folders, :email_labels
  end
end
