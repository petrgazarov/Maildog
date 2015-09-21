class AddDefaultToEmailAddresseesEmailTypeColumn < ActiveRecord::Migration
  def change
    change_column :email_addressees, :email_type, :string,
                  default: true, null: false
  end
end
