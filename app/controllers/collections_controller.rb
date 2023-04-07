class CollectionsController < ApplicationController


    def index
        collections = Collection.all
        render json: collections, status: :ok
    end

    def create
        collection = Collection.create!(collection_params)
        render json: collection, status: :created
    end

    private

    def collection_params
        params.permit(:name, :description)
    end

end