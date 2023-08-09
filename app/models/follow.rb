class Follow < ApplicationRecord
    # The user that is following
    belongs_to :follower, foreign_key: :follower_id, class_name "User"

    # The user that is being followed
    belongs_to :followed_user, foreign_key: :followed_user_id, class_name "User"

end
