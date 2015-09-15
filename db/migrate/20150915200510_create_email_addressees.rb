class CreateEmailAddressees < ActiveRecord::Migration
  def change
    create_table :email_addressees do |t|
      t.integer :email_id, null: false
      t.integer :addressee_id, null: false
      t.string :type, null: false

      t.timestamps null: false
    end
    add_index :email_addressees, :email_id
    add_index :email_addressees, :addressee_id
    add_index :email_addressees, [:email_id, :type]
  end
end
