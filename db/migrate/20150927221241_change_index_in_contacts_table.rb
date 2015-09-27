class ChangeIndexInContactsTable < ActiveRecord::Migration
  def change
    remove_index(:contacts, :column => 'email')
    remove_index(:contacts, :column => 'owner_id')
    add_index(:contacts, [:owner_id, :email], unique: true)
  end
end
