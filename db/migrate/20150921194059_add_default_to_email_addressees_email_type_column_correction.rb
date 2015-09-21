class AddDefaultToEmailAddresseesEmailTypeColumnCorrection < ActiveRecord::Migration
  def change
    change_column :email_addressees, :email_type, :string,
                  default: "to", null: false
  end
end
