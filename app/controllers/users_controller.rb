class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, status: :ok
        byebug
      end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def update
        @current_user.update!(user_params)
        render json: user, status: :ok
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :name, :location, :bio)
    end

end