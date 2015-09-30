class AddIndexToFolders < ActiveRecord::Migration
  def change
    add_index :folders, :author_id
  end
end
