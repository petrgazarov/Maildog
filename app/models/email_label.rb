class EmailLabel < ActiveRecord::Base
  validates :email, :label, presence: true

  belongs_to :email

  belongs_to :label
end
