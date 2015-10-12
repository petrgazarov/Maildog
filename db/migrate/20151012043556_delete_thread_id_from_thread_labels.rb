class DeleteThreadIdFromThreadLabels < ActiveRecord::Migration
  def change
    remove_column :thread_labels, :thread_id
  end
end
