class User < ActiveRecord::Base
  validates :username, :email, :first_name, :last_name,
            :session_token, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    if user
      user.is_password?(password) ? :user : nil
    else
      nil
    end
  end

  def ensure_session_token!
    self.session_token ||= self.class.generate_session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = self.class.generate_session_token
    self.save!
  end
end
