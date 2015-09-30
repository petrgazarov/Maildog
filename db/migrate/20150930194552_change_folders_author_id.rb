class ChangeFoldersAuthorId < ActiveRecord::Migration
  def change
    rename_column :folders, :author_id, :owner_id
  end
end
