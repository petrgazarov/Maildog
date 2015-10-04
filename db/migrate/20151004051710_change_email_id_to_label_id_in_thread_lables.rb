class ChangeEmailIdToLabelIdInThreadLables < ActiveRecord::Migration
  def change
    rename_column :thread_labels, :email_id, :label_id
  end
end
