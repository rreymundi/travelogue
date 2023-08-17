class Follow < ApplicationRecord
    # The user that is following
    belongs_to :follower, class_name: "User"
    validates :follower_id, presence: true
    # The user that is being followed
    belongs_to :followed_user, class_name: "User"
    validates :followed_user_id, presence: true

end
