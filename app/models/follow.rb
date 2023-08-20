class Follow < ApplicationRecord
    # The user that is following
    belongs_to :follower, class_name: "User"
    validates :follower_id, presence: true
    # The user that is being followed
    belongs_to :followed_user, class_name: "User"
    validates :followed_user_id, presence: true

    # # # custom validation
    # validate :doesnt_follow_self

    # # private
  
    # # # this custom validation prevents user from following self
    # def doesnt_follow_self
    #     if follower == followed_user
    #         errors.add(:base, 'You can\'t follow yourself')
    #     end
    # end

end
