class Contact < ActiveRecord::Base
  validates :email, :owner, presence: true

  has_many :emails,
    class_name: "EmailAddressee",
    foreign_key: :email_id

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id

  def self.create_or_get(email_address)
    contact = Contact.find_by({ email: email_address })
    contact ? contact : Contact.new({ email: email_address })
  end
end
