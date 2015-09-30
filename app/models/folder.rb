class Folder < ActiveRecord::Base
  validates :author, :name, presence: true

end
