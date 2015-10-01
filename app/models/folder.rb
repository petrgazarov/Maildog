class Folder < ActiveRecord::Base
  validates :owner, :name, presence: true

  belongs_to :owner,
    class_name: "Contact",
    foreign_key: :owner_id

  has_many :email_folders

  has_many :emails,
    through: :email_folders,
    source: :folder
end
