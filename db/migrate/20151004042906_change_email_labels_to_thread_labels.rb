class ChangeEmailLabelsToThreadLabels < ActiveRecord::Migration
  def change
    rename_table :email_labels, :thread_labels
    rename_column :thread_labels, :email_id, :thread_id
  end
end
