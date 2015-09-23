class AddDraftColumnToEmails < ActiveRecord::Migration
  def change
    add_column :emails, :draft, :boolean, default: false
  end
end
