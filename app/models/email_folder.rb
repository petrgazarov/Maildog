class EmailFolder < ActiveRecord::Base
  validates :email, :folder, presence: true
end
