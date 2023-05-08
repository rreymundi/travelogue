class User < ApplicationRecord
    has_secure_password
    has_one_attached :avatar
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, on: :create
    has_many :travelogues, dependent: :destroy
    has_many :saved_posts, dependent: :destroy

    def avatar_url
      if avatar.attached?
        Rails.application.routes.url_helpers.rails_blob_path(avatar, only_path: true)
      else
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"      
      end
    end

end