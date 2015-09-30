class CreateFolders < ActiveRecord::Migration
  def change
    create_table :folders do |t|
      t.text :name, null: false
      t.integer :author_id, null: false

      t.timestamps null: false
    end
  end
end
