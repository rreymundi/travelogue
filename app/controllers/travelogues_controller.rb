class TraveloguesController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :search]
    before_action :set_travelogue, except: [:index, :create, :search]
    
    def index
        @travelogues = Travelogue.all.order(created_at: :desc)
        render json: @travelogues, status: :ok
    end

    def show
        render json: @travelogue, status: :ok
    end

    def create
        @travelogue = @current_user.travelogues.new(travelogue_params.except(:tags))
        @travelogue.cover_image.attach(travelogue_params[:cover_image])
        # converts tags params into an array and strips trailing spaces/symbols. this is because formData append coverts the array into a string.
        tags = travelogue_params[:tags].strip.split(',') unless travelogue_params[:tags].nil?
        create_or_delete_travelogue_tags(@travelogue, tags) unless travelogue_params[:tags].nil?
        @travelogue.save!
        render json: @travelogue, status: :created
    end
    
    def update
        @travelogue.attributes = travelogue_params.except(:tags)
        create_or_delete_travelogue_tags(@travelogue, params[:tags])
        @travelogue.save!
        render json: @travelogue, status: :ok
    end

    def destroy
        @travelogue.destroy
        head :no_content
    end

    # this custom route allows changing the cover image while updating an existing travelogue
    def coverimagechange
        @travelogue.cover_image.attach(travelogue_params[:cover_image])
        render json: @travelogue, status: :ok
    end

    # this custom route allows searching for travelogues by title, description, and location
    # found this to be a helpful resource to make this work: https://cbabhusal.wordpress.com/2015/06/04/ruby-on-rails-case-insensitive-matching-in-rails-where-clause/
    # there is a class method in the Travelogue model that handles the search. more information there.
    # this controller action simply takes the params and passes them to the class method in the model. the results are then rendered as json
    def search
        results = Travelogue.search(params[:query])
        # if results.empty?
        #     render json: { errors: ['No results found'] }, status: :not_found
        # else
            render json: results, status: :ok
        # end
    end

    private

    def create_or_delete_travelogue_tags(travelogue, tags)
        travelogue.post_tags.destroy_all
        tags.each do |tag|
            travelogue.tags << Tag.find_or_create_by(name: tag)
        end
    end

    def set_travelogue
        @travelogue = Travelogue.find(params[:id])
    end

    def travelogue_params 
        params.permit(:title, :description, :location, :cover_image, :tags).select { |k, v| v.present? }
    end

end