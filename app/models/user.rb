class User < ApplicationRecord
    has_secure_password
    has_one_attached :avatar
    has_many :travelogues, dependent: :destroy
    has_many :locations, through: :travelogues
    has_many :collections
end