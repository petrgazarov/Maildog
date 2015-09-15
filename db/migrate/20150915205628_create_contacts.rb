class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :email, null: false
      t.string :first_name
      t.string :last_name
      t.string :photo_src_path
      t.string :job_title
      t.date :birth_date
      t.string :gender
      t.integer :owner_id, null: false

      t.timestamps null: false
    end

    add_index :contacts, :email, unique: true
    add_index :contacts, :owner_id
  end
end
