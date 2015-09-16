class RemoveNotNullConstraintFromEmailAddressees < ActiveRecord::Migration
  def change
    change_column :email_addressees, :addressee_id, :integer, null: true
  end
end
