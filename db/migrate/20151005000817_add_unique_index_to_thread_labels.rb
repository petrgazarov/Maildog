class AddUniqueIndexToThreadLabels < ActiveRecord::Migration
  def change
    add_index :thread_labels, [:email_thread_id, :label_id], unique: true
  end
end
