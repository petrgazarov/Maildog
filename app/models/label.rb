class Label < ActiveRecord::Base
  validates :owner, :name, presence: true

  belongs_to :owner,
    class_name: "Contact",
    foreign_key: :owner_id

  has_many :thread_labels,
    class_name: "ThreadLabel",
    foreign_key: :label_id,
    dependent: :destroy,
    inverse_of: :label

  has_many :threads,
    through: :thread_labels,
    source: :thread
end
