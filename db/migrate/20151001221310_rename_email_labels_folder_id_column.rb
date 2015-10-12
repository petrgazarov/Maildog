class RenameEmailLabelsFolderIdColumn < ActiveRecord::Migration
  def change
    rename_column :thread_labels, :folder_id, :label_id
  end
end
