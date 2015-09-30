class Folder < ActiveRecord::Base
  validates :author, :name, presence: true

  belongs_to :contact,
  class_name: "Contact",
  foreign_key: :owner_id
end
