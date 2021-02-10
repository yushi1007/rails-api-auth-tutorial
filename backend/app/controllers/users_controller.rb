class UsersController < ApplicationController

  # POST /login
  def login
    # TODO: look up a user with username and password
    user = User.first
    render json: user
  end

end
