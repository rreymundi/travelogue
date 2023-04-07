class Travelogue < ApplicationRecord
    belongs_to :user
    belongs_to :location
end