class Travelogue < ApplicationRecord
    has_one_attached :cover_image
    validates :title, presence: true
    validates :description, presence: true
    validates :cover_image, presence: true
    belongs_to :user
    has_many :post_tags, dependent: :destroy
    has_many :tags, through: :post_tags

    # this method returns the url of the cover image if it exists
    # otherwise, it returns nil
    def cover_image_url
      if cover_image.attached?
        Rails.application.routes.url_helpers.rails_blob_path(cover_image, only_path: true)
      else
        nil   
      end
    end

    # this class method takes a query as an argument and returns all travelogues that match the query
    # in order to not disrupt the browsing experience, i opted to return all travelogues if
    # the query is empty or nil
    def self.search(query)
      if query
        results = where("lower(title) LIKE :query OR lower(description) LIKE :query OR lower(location) LIKE :query", query: "%#{query.downcase}%")
        if results.empty?
          all.order(created_at: :desc)
        else 
          results
        end
      else
        all.order(created_at: :desc)
      end
    end

end