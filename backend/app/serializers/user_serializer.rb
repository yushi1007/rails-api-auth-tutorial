class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :image
end
