class Collection < ApplicationRecord
    belongs_to :user
    has_many :travelogues
    has_many :locations, through: :travelogues
end