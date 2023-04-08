class Travelogue < ApplicationRecord
    has_one_attached :cover_image
    belongs_to :user
    belongs_to :location
end