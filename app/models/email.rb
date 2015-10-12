class Email < ActiveRecord::Base
  include PgSearch
  multisearchable against: [
    :body, :sender_first_name, :sender_last_name
  ]

  def self.rebuild_pg_search_documents
    find_each { |record| record.update_pg_search_document }
  end

  validates :date, :time, presence: true

  belongs_to :sender,
    class_name: "Contact",
    foreign_key: "sender_id"

  has_many :email_addressees,
    class_name: "EmailAddressee",
    foreign_key: :email_id,
    inverse_of: :email

  has_many :addressees,
    through: :email_addressees,
    source: :addressee

  belongs_to :parent_email,
    class_name: "Email",
    foreign_key: :parent_email_id

  has_many :responses_forwards,
    class_name: "Email",
    foreign_key: :parent_email_id

  belongs_to :original_email,
    class_name: "Email",
    foreign_key: :original_email_id

  has_many :following_emails,
    class_name: "Email",
    foreign_key: :original_email_id

  belongs_to :thread,
    class_name: "EmailThread",
    foreign_key: :email_thread_id

  after_initialize :ensure_date_and_time

  def ensure_date_and_time
    if !self.trash
      self.date ||= Date.today
      self.time ||= Time.now
    end
  end

  def changed_star_or_trash(new_starred, new_trash)
    !(self.starred == new_starred && self.trash == new_trash)
  end

  def sender_first_name
    sender.first_name
  end

  def sender_last_name
    sender.last_name
  end
end
