class UsersController < ApplicationController

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :name, :location, :bio)
    end

end