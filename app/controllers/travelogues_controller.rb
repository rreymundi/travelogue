class TraveloguesController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :search]
    before_action :set_travelogue, except: [:index, :create, :search]
    
    def index
        travelogues = Travelogue.all.order(created_at: :desc)
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

    # this custom route allows searching for travelogues by title, description, 
    # location, or tags
    # found this to be a helpful resource to make this work: https://cbabhusal.wordpress.com/2015/06/04/ruby-on-rails-case-insensitive-matching-in-rails-where-clause/
    # if/else to determine what data to retrieve based on whether or not a search term was entered
    # opted to return all travelogues if no search term was entered, rather than an error message
    # def search
    #     query = "%#{params[:query]}%"
    #     # if query is nil, return all travelogues as not to disrupt browsing experience
    #     if query.nil?
    #         travelogues = Travelogue.all.order(created_at: :desc)
    #         render json: travelogues, status: :ok
    #         # render json: { errors: ['No search term entered'] }, status: :bad_request
    #     else 
    #         travelogues = Travelogue.where("lower(title) LIKE ? OR lower(description) LIKE ? OR lower(location) LIKE ?", query.downcase, query.downcase, query.downcase)
    #         # if no results are found, return all travelogues
    #         if travelogues.empty?
    #             # render json: { errors: ['No results found'] }, status: :not_found
    #             travelogues = Travelogue.all.order(created_at: :desc)
    #             render json: travelogues, status: :ok
    #         else
    #             render json: travelogues, status: :ok
    #         end
    #     end
    # end

    # this custom route allows searching for travelogues by title, description, and location
    # found this to be a helpful resource to make this work: https://cbabhusal.wordpress.com/2015/06/04/ruby-on-rails-case-insensitive-matching-in-rails-where-clause/
    # there is a class method in the Travelogue model that handles the search. more information there.
    # this controller action simply takes the params and passes them to the class method in the model
    # the results are then rendered as json
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