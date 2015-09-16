class RemoveNotNullConstraintFromEmails < ActiveRecord::Migration
  def change
    change_column :email_addressees, :email_id, :integer, null: true 
  end
end
