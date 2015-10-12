class RenameThreadLabelsEmailId < ActiveRecord::Migration
  def change
    rename_column :thread_labels, :email_id, :thread_id
  end
end
