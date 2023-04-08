class User < ApplicationRecord
    has_secure_password
    has_one_attached :avatar
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    has_many :travelogues, dependent: :destroy
    has_many :locations, through: :travelogues
    has_many :collections
end