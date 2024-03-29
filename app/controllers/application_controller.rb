class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Pagination
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize
  wrap_parameters format: []

  private

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: ["Log in or sign up to continue"] }, status: :unauthorized unless @current_user
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
