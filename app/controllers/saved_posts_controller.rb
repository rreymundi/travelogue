class SavedPostsController < ApplicationController

    def index
        saved_posts = @current_user.saved_posts
        render json: saved_posts
    end

    def create
        saved_post = @current_user.saved_posts.create!(saved_post_params)
        render json: saved_post, status: :created
    end

    def destroy
        saved_post = @current_user.saved_posts.find_by(params[:travelogue_id])
        saved_post.destroy
        head :no_content
    end

    private

    def saved_post_params
        params.permit(:travelogue_id)
    end

end