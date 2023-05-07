class TravelogueSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :cover_image_url, :created_at, :tags
  has_many :tags, through: :post_tags
  belongs_to :user
end