class CreateEmailThreads < ActiveRecord::Migration
  def change
    create_table :email_threads do |t|
      t.text :subject

      t.timestamps null: false
    end
  end
end