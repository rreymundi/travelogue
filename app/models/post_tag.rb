class PostTag < ApplicationRecord
    belongs_to :travelogue
    belongs_to :tag
end