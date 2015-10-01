class EmailFolder < ActiveRecord::Base
  validates :email, :folder, presence: true

  belongs_to :email

  belongs_to :folder
end
