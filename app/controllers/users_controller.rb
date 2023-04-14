class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]
# remember to delete the index action from the skip_before_action
    def index
        users = User.all
        render json: users, status: :ok
      end

    def show
    render json: @current_user
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