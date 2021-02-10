class User < ApplicationRecord
  has_secure_password
  # password "123" => password_digest "asdsadozixi98z3i4kskdfjskdf"
  # user.authenticate("123")
  
  validates :username, uniqueness: { case_sensitive: false }
end