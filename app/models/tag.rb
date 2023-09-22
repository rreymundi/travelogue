class Tag < ApplicationRecord
    has_many :post_tags, dependent: :destroy
    has_many :travelogues, through: :post_tags
    validates :name, presence: true, uniqueness: true, length: { maximum: 10 }, format: { with: /\A[a-zA-Z0-9]+\Z/, message: "only allows letters and numbers" }

end