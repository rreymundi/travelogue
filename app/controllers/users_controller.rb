class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def index
        users = User.all
        render json: users, status: :ok
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
        params.permit(:username, :password, :password_confirmation, :name, :location, :bio, :avatar)
    end

end