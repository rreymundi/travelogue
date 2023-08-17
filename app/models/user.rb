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

    # FOLLOWINGS
    #  Will return an array of follows this User instance gave to someone else
    has_many :active_follows, class_name: "Follow", foreign_key: "follower_id", dependent: :destroy
    # Will return an array of other users who the User instance has followed 
    # THIS IS WHAT I SHOULD USE IN MY ROUTES AND CONTROLLER
    has_many :following, through: :active_follows, source: :followed_user

    # FOLLOWERS
    # Will return an array of follows for the given User instance
    has_many :passive_follows, class_name: "Follow", foreign_key: "followed_user_id", dependent: :destroy
    # Will return an array of users who follow the User instance 
    # THIS IS WHAT I SHOULD USE IN MY ROUTES AND CONTROLLER
    has_many :followers, through: :passive_follows, source: :follower

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

    # this instance method handles following a user
    def follow(user)
      active_follows.create(followed_user_id: user.id)
    end
    # this instance method handles un-following a user
    def unfollow(user)
      active_follows.find_by(followed_user_id: user.id).destroy
    end
    # this instance method handles checking if a User instance is following a certain user
    def following?(user)
      active_follows.include?(user)
    end

end