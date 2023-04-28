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
        self.cover_image.attach(io: File.open(Rails.root.join('client', 'src', 'assets', 'no_image.jpg')), filename: 'no_image.jpg', content_type: 'application/jpeg')
      end
    end
  

end