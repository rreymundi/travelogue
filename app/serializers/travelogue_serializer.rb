class TravelogueSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :cover_image_url, :created_at, :tags
end