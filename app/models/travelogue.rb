class Travelogue < ApplicationRecord
    validates :title, presence: true
    validates :description, presence: true
    validates :saved, presence: true
    validates :collection_id, presence: true
    validates :user_id, presence: true
    validates :collection_id, presence: :true
    has_one_attached :cover_image
    belongs_to :user
    belongs_to :location
end