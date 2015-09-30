class CreateEmailFolders < ActiveRecord::Migration
  def change
    create_table :email_folders do |t|
      t.integer :email_id, null: false
      t.integer :folder_id, null: false

      t.timestamps null: false
    end

    add_index :email_folders, :email_id
    add_index :email_folders, :folder_id
  end
end
