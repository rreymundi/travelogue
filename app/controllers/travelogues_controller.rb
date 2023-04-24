class TraveloguesController < ApplicationController

    def index
        travelogues = Travelogue.all
        render json: travelogues, status: :ok
    end

    def create
        @travelogue = @current_user.travelogues.new(travelogue_params.except(:tags))
        @travelogue.cover_image.attach(params[:cover_image])
        create_or_delete_travelogue_tags(@travelogue, travelogue_params[:tags])
        if @travelogue.save
            render json: @travelogue, status: :ok
        else
            render json: @travelogue.errors, status: :unprocessable_entity
        end
    end

    def update
        create_or_delete_travelogue_tags(@travelogue, travelogue_params[:tags])
        respond_to do |format|
            if @travelogue.save
                format.json { render json: @travelogue, status: :ok }
            else
                format.json { render json: @travelogue.errors, status: :unprocessable_entity }
            end
        end
      end

    def destroy
        travelogue = @current_user.travelogues.find(params[:id])
        travelogue.destroy
        head :no_content
    end

    def coverimagechange
        travelogue = @current_user.travelogues.find(travelogue_params[:id])
        travelogue.cover_image.attach(travelogue_params[:cover_image])
        render json: travelogue, status: :ok
    end

    private

    def create_or_delete_travelogue_tags(travelogue, tags)
        travelogue.post_tags.destroy_all
        tags = tags.strip.split(',')
        tags.each do |tag|
            tag.strip!
            puts tag
            travelogue.tags << Tag.find_or_create_by(name: tag)
        end
      end

    def set_travelogue
        @travelogue = Travelogue.find(travelogue_params[:id])
    end

    def travelogue_params 
        params.permit(:title, :description, :location, :saved, :cover_image, :tags)
    end

end