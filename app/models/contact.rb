class Contact < ActiveRecord::Base
  validates :email, :owner, presence: true

  scope :emails, lambda{ ||}

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

  def self.create_or_get(email_address)
    contact = Contact.find_by({ email: email_address })
    contact ? contact : Contact.new({ email: email_address })
  end

  def all_emails
    written_emails + received_emails
  end

  def inbox_emails
    # Email.joins("JOIN email_addressees ON emails.id = email_addressees.id")
    #      .where("email_addressees.addressee_id = #{id}")
    #      .where("emails.trash = 'false'")

    Email.find_by_sql(<<-SQL)
      SELECT
        emails.* AS email, COUNT() AS thread_count
      FROM
        emails
      JOIN
        email_addressees
      ON
        emails.id = email_addressees.email_id
      WHERE
        email_addressees.addressee_id = #{id} AND emails.trash = 'false'
      GROUP BY
        emails.original_email_id

      ORDER BY
        emails.date DESC, emails.time DESC
      LIMIT
        1
    SQL
  end

  def sent_emails
    Email.where(sender_id: id, trash: false)
  end

  def draft_emails
    Email.where(sender_id: id, trash: false, draft: true)
  end
end
