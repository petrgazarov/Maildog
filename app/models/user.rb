class User < ActiveRecord::Base
  validates :username, :email, :first_name, :last_name,
            :session_token, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates_uniqueness_of :username

  attr_reader :password

  after_initialize :ensure_session_token
  before_validation :ensure_email

  has_many :contacts,
    class_name: "Contact",
    foreign_key: :owner_id

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    if user
      user.is_password?(password) ? user : nil
    else
      nil
    end
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def ensure_email
    self.email ||= self.username + '@maildog.xyz'
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def find_by_username(username)
    user = User.find_by(username: username)
    user.empty? ? nil : user
  end
end
