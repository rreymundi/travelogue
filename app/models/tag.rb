class Tag < ApplicationRecord
    has_many :post_tags
    has_many :travelogues, through: :post_tags
end