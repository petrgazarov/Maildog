class ThreadLabel < ActiveRecord::Base
  validates :thread, :label, presence: true

  belongs_to :thread,
    class_name: "EmailThread",
    foreign_key: :email_thread_id,
    inverse_of: :thread_labels

  belongs_to :label,
    class_name: "Label",
    foreign_key: :label_id,
    inverse_of: :thread_labels
end
