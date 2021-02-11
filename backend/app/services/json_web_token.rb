class JsonWebToken
  def self.encode(payload)
    JWT.encode(payload, ENV['JWT_SECRET'], 'HS256')
  end

  def self.decode(token)
    JWT.decode(token, ENV['JWT_SECRET'], true, { algorithm: 'HS256' })[0]
  end
end