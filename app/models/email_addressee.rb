class EmailAddressee < ActiveRecord::Base
  validates :email, :addressee, :type, presence: true

  belongs_to :email,
    foreign_key: :email_id

  belongs_to :addressee,
    class_name: "Contact",
    foreign_key: :addressee_id
end
