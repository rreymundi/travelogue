class User < ApplicationRecord
    has_secure_password
    has_one_attached :avatar
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, on: :create
    has_many :travelogues, dependent: :destroy
    has_many :saved_posts, dependent: :destroy
    # validate :password_lower_case
    # validate :password_uppercase
    # validate :password_special_char
    # validate :password_contains_number

    def avatar_url
      if avatar.attached?
        Rails.application.routes.url_helpers.rails_blob_path(avatar, only_path: true)
      else
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"      
      end
    end
  
    # this custom validation method is used to ensure the actual password is safe
    # this was an awesome resource
    # https://dev.to/nodefiend/rails-password-validation-29kj
    # def password_uppercase
    #   return if !!password.match(/\p{Upper}/)
    #   errors.add :password, ' must contain at least 1 uppercase '
    # end
  
    # def password_lower_case
    #   return if !!password.match(/\p{Lower}/)
    #   errors.add :password, ' must contain at least 1 lowercase '
    # end
  
    # def password_special_char
    #   special = "?<>',?[]}{=-)(*&^%$#`~{}!"
    #   regex = /[#{special.gsub(/./){|char| "\\#{char}"}}]/
    #   return if password =~ regex
    #   errors.add :password, ' must contain special character'
    # end
  
    # def password_contains_number
    #   return if password.count("0-9") > 0
    #   errors.add :password, ' must contain at least one number'
    # end

end