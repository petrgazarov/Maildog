class ChangeEmailsDraftEmailtoDraft < ActiveRecord::Migration
  def change
    rename_column :emails, :draft_email, :draft
  end
end
