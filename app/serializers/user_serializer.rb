class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :bio, :location, :avatar_url
  has_many :travelogues
  has_many :saved_posts
  has_many :following
end