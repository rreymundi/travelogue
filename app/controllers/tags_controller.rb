class TagsController < ApplicationController
    skip_before_action :authorize, only: [:index]

    def index
        tags = Tag.all 
        render json: tags, status: :ok
    end

    def destroy
        tag = Tag.find(tag_params[:id])
        tag.destroy
        head :no_content
    end

    private

    def tag_params
        params.permit(:id)
    end

end