class Contact < ActiveRecord::Base
  validates :email, :owner, presence: true

  has_many :received_emails,
    through: :email_addressees,
    source: :email

  has_many :written_emails,
    class_name: "Email",
    foreign_key: :sender_id

  has_many :email_addressees,
    class_name: "EmailAddressee",
    foreign_key: :addressee_id

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id

  has_many :labels,
    class_name: "Label",
    foreign_key: :owner_id

  has_many :threads,
    class_name: "EmailThread",
    foreign_key: :owner_id

  def self.create_or_get(email_address, user, current_user_contact = nil)
    contact = Contact.find_by(email: email_address, owner_id: user.id)

    if !contact
      if current_user_contact.nil?
        contact = Contact.new(email: email_address)
      else
        contact = current_user_contact.dup
      end

      contact.owner_id = user.id
    end

    contact
  end
end
