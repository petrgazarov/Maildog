class RenameEmailLabelsFolderIdColumn < ActiveRecord::Migration
  def change
    rename_column :email_labels, :folder_id, :label_id
  end
end
