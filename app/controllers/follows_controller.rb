class FollowsController < ApplicationController

  before_action :find_user
  
  def create
      @current_user.follow(@user)
      follow = @current_user.active_follows.find_by(followed_user_id: @user.id)
      render json: follow, status: :created
  end

  def destroy
    @current_user.unfollow(@user)
    render json: @current_user.following
  end

  private

  def find_user
      @user = User.find(params[:id])
  end

end
