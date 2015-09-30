class Folder < ActiveRecord::Base
  validates :owner, :name, presence: true

  belongs_to :owner,
  class_name: "Contact",
  foreign_key: :owner_id
end
