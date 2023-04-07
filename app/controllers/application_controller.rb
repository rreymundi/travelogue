class ApplicationController < ActionController::API
  include ActionController::Cookies

  @current_user = User.find_by(id: session[:user_id])

end
