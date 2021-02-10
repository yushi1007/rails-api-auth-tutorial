class ApplicationController < ActionController::API

  def authenticate
    # TODO: check some identifying info about request (token header)
    # if user is logged in
    # the can access this route
    # otherwise
    # don't give them access
    @current_user = User.first
  end

end
