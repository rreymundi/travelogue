class TraveloguesController < ApplicationController

    def index
        travelogues = Travelogue.all
        render json: travelogues, status: :ok
    end

    def update
        task = @current_user.tasks.find(params[:id])
        task.update!(task_params)
        render json: task, status: :ok
    end

    def create
        task = @current_user.tasks.create!(task_params)
        render json: task, status: :created
    end

    def destroy
        task = @current_user.tasks.find(params[:id])
        task.destroy
        head :no_content
    end

    private

    def task_params 
        params.permit(:name, :description, :priority, :project_id, :status)
    end

end