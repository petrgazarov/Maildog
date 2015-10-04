class ThreadLabel < ActiveRecord::Base
  validates :thread, :label, presence: true

  belongs_to :thread,
    class_name: "EmailThread",
    foreign_key: :email_thread_id

  belongs_to :label
end
