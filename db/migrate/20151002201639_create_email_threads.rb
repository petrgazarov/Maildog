class CreateEmailThreads < ActiveRecord::Migration
  def change
    create_table :email_threads do |t|
      t.text :subject
      t.integer :owner_id, null: false

      t.timestamps null: false
    end
  end
end
