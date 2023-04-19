class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :bio, :location, :avatar_url
end