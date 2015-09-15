class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string    :subject
      t.text      :body
      t.integer   :sender_id,      null: false
      t.boolean   :starred,        default: false
      t.boolean   :checked,        default: false
      t.date      :date,           null: false
      t.time      :time,           null: false
      t.integer   :parent_email_id

      t.timestamps null: false
    end
    add_index :emails, :sender_id
    add_index :emails, [:sender_id, :starred]
    add_index :emails, [:sender_id, :checked]
    add_index :emails, [:sender_id, :date]
    add_index :emails, [:sender_id, :time]
    add_index :emails, :parent_email_id
  end
end
