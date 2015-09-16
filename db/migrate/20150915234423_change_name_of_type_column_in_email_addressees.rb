class ChangeNameOfTypeColumnInEmailAddressees < ActiveRecord::Migration
  def change
    rename_column :email_addressees, :type, :email_type
  end
end
