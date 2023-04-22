class TraveloguesController < ApplicationController

    def index
        travelogues = Travelogue.all
        render json: travelogues, status: :ok
    end

    def create
        travelogue = @current_user.travelogues.create!(travelogue_params)
        render json: travelogue, status: :created
    end

    def update
        travelogue = @current_user.travelogues.find(params[:id])
        travelogue.update!(travelogue_params)
        render json: travelogue, status: :ok
    end

    def destroy
        travelogue = @current_user.travelogues.find(params[:id])
        travelogue.destroy
        head :no_content
    end

    def coverimagechange
        travelogue = @current_user.travelogues.find(params[:id])
        travelogue.cover_image.attach(params[:cover_image])
        render json: travelogue, status: :ok
    end

    private

    def travelogue_params 
        params.permit(:title, :description, :location, :saved, :collection_id, :cover_image)
    end

end