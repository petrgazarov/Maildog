class Email < ActiveRecord::Base
  validates :sender, :date, :time, presence: true

  belongs_to :sender,
    class_name: "User",
    foreign_key: "sender_id"

  has_many :addressees,
    class_name: "EmailAddressee",
    foreign_key: :email_id,
    inverse_of: :email

  after_initialize :ensure_date_and_time

  def ensure_date_and_time
    self.date ||= Date.today
    self.time ||= Time.now.strftime("%I:%M:%S %z")
  end
end
