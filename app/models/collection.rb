class Collection < ApplicationRecord
    validates :name, presence: :true
    validates :description, presence: :true
    validates :user_id, presence: :true 
    belongs_to :user
    has_many :travelogues
    has_many :locations, through: :travelogues
end