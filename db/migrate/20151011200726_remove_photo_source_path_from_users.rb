class RemovePhotoSourcePathFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :photo_src_path, :string
  end
end
