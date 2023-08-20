class FollowsController < ApplicationController
  before_action :find_user
  
  def create
    if @current_user != @user
      @current_user.follow(@user)
      follow = @current_user.following.find_by(id: @user.id)
      render json: follow, status: :created
    else 
      render json: { errors: ['You can\'t follow yourself']  }, status: :not_acceptable
    end
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
