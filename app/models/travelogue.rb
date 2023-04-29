class Travelogue < ApplicationRecord
    has_one_attached :cover_image
    validates :title, presence: true
    validates :description, presence: true
    belongs_to :user
    has_many :post_tags, dependent: :destroy
    has_many :tags, through: :post_tags

    def cover_image_url
      if cover_image.attached?
        Rails.application.routes.url_helpers.rails_blob_path(cover_image, only_path: true)
      else
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"      
      end
    end

end