class User < ApplicationRecord
  has_secure_password
  # password "123" => password_digest "asdsadozixi98z3i4kskdfjskdf"
  # user.authenticate("123")
  
  validates :username, uniqueness: { case_sensitive: false }

  def self.find_or_create_from_google(payload)
    User.where(username: payload["email"]).first_or_create do |new_user|
      new_user.username = payload["email"]
      new_user.image = payload["picture"]
      new_user.password = SecureRandom.base64(15)
    end
  end

end