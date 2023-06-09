class User < ApplicationRecord
  PASSWORD_REQUIREMENTS = /\A
  (?=.{8,})          # Must contain 8 or more characters
  (?=.*\d)           # Must contain a digit
  (?=.*[a-z])        # Must contain a lower case character
  (?=.*[A-Z])        # Must contain an upper case character
  (?=.*[[:^alnum:]]) # Must contain a symbol
/x
    has_secure_password
    has_one_attached :avatar
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, on: :create
    has_many :travelogues, dependent: :destroy
    has_many :saved_posts, dependent: :destroy
    validate :custom_password_validation, on: :create

    def avatar_url
      if avatar.attached?
        Rails.application.routes.url_helpers.rails_blob_path(avatar, only_path: true)
      else
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"      
      end
    end

    # this is a custom validation method that takes the password
    # and checks to see if it matches the PASSWORD_REQUIREMENTS constant
    def custom_password_validation
      if password.present? && !password.match(PASSWORD_REQUIREMENTS)
        errors.add(:password, "must contain at least eight characters, one digit, one lower case character, one upper case character, and one symbol")
      end
    end

end