class SavedPost < ApplicationRecord
    belongs_to :user
    belongs_to :travelogue
end