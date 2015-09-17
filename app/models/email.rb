class Email < ActiveRecord::Base
  validates :sender, :date, :time, presence: true

  belongs_to :sender,
    class_name: "User",
    foreign_key: "sender_id"

  has_many :addressees,
    class_name: "EmailAddressee",
    foreign_key: :email_id,
    inverse_of: :email

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

  after_initialize :ensure_date_and_time

  def ensure_date_and_time
    self.date ||= Date.today
    self.time ||= Time.now.strftime("%I:%M:%S %z")
  end
end
