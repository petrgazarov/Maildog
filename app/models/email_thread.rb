class EmailThread < ActiveRecord::Base
  validates :owner, presence: true
  
  has_many :emails,
    dependent: :destroy,
    class_name: "Email",
    foreign_key: :email_thread_id

  belongs_to :owner,
    class_name: "Contact",
    foreign_key: :owner_id

  has_many :thread_labels,
    class_name: "ThreadLabel",
    foreign_key: :email_thread_id,
    dependent: :destroy,
    inverse_of: :thread

  has_many :labels,
    through: :thread_labels,
    source: :label

  def trash_count
    emails.where(trash: true).count
  end

  def non_trash_count
    emails.where(trash: false).count
  end
end
