class Contact < ActiveRecord::Base
  validates :email, :owner, presence: true

  has_many :emails,
    class_name: "EmailAddressee",
    foreign_key: :email_id

  def self.create_or_get(email_address)
    contact = Contact.find_by({ email: email_address })
    if !contact
      contact = current_user.contacts.new({ email: email_address })
      contact.save!
    end

    contact
  end
end
