class TraveloguesController < ApplicationController
    before_action :set_travelogue, except: [:index, :create]
    
    def index
        travelogues = Travelogue.all
        render json: travelogues, status: :ok
    end

    def show
        render json: @travelogue, status: :ok
    end

    def create
        @travelogue = @current_user.travelogues.new(travelogue_params.except(:tags))
        @travelogue.cover_image.attach(params[:cover_image])
        create_or_delete_travelogue_tags(@travelogue, travelogue_params[:tags])
        @travelogue.save!
        render json: @travelogue, status: :created
    end

    # def update
    #     travelogue = @current_user.travelogues.find(params[:id])
    #     create_or_delete_travelogue_tags(travelogue, params[:travelogue][:tags])
    #     travelogue.update!(travelogue_params)
    #     render json: travelogue, status: :ok
    #   end

    def update
        create_or_delete_travelogue_tags(@travelogue, params[:tags])
        @travelogue.update!(travelogue_params.except(:tags))
        render json: @travelogue, status: :ok
    end

    def destroy
        @travelogue.destroy
        head :no_content
    end

    # this custom route allows changing the cover image while updating 
    # an existing travelogue
    def coverimagechange
        @travelogue.cover_image.attach(travelogue_params[:cover_image])
        render json: @travelogue, status: :ok
    end

    private

    def create_or_delete_travelogue_tags(travelogue, tags)
        travelogue.post_tags.destroy_all
        # this checks if "tags" is a string or an array. 
        # if string, it strips trailing spaces/symbols and turns string into array
        if tags.is_a?(String) == true
            tags = tags.strip.split(',')
        else 
        # if not string, it just returns the existing "tags" array
            tags
        end
        # then it iterates through the array and creates a new tag for each item
        tags.each do |tag|
            # tag.strip!
            travelogue.tags << Tag.find_or_create_by(name: tag)
        end
      end

    def set_travelogue
        @travelogue = Travelogue.find(params[:id])
    end

    def travelogue_params 
        params.permit(:title, :description, :location, :cover_image, :tags)
    end

end