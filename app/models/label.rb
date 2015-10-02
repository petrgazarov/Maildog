class Label < ActiveRecord::Base
  validates :owner, :name, presence: true

  belongs_to :owner,
    class_name: "Contact",
    foreign_key: :owner_id

  has_many :email_labels,
    dependent: :destroy

  has_many :emails,
    through: :email_labels,
    source: :email
end
