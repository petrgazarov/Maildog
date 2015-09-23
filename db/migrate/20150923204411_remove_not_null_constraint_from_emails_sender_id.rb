class RemoveNotNullConstraintFromEmailsSenderId < ActiveRecord::Migration
  def change
    change_column :emails, :sender_id, :integer, null: true
  end
end
