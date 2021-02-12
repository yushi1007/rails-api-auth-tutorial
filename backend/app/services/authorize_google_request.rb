# take in the headers
# get back an authenticated user

class AuthorizeGoogleRequest
  def initialize(headers = {})
    @headers = headers
  end

  def user
    payload = decode(auth_token)
    if payload
      User.find_or_create_from_google(payload)
    end
  end

  private

  attr_reader :headers

  def decode(token)
    validator = GoogleIDToken::Validator.new
    validator.check(token, "922309369365-hpqccner3sal8e9fj0mbvoutd596l46i.apps.googleusercontent.com")
  rescue
    nil
  end

  def auth_token
    headers['Authorization'].split.last if headers['Authorization']
  end

end
