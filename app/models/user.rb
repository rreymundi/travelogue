class User < ApplicationRecord
    has_secure_password
    has_one_attached :avatar
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, on: :create
    has_many :travelogues, dependent: :destroy

    def avatar_url
      if avatar.attached?
        Rails.application.routes.url_helpers.rails_blob_path(avatar, only_path: true)
      else
        self.avatar.attach(io: File.open(Rails.root.join(‘client’, ‘src’, avatar, ‘no_photo.jpeg’)), filename: ‘no_photo.jpeg’, content_type: “application/jpeg”)
      end
    end

end