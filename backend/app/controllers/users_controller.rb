class UsersController < ApplicationController

  # POST /login
  def login
    # TODO: look up a user with username and password
    user = User.first
    render json: user
  end

  # GET /me
  def me
    # TODO: check some identifying info about request (token header)
    user = User.first
    render json: user
  end

  # PATCH /me
  def update
    user = User.first
    user.update(bio: params[:bio], image: params[:image])
    render json: user
  end

end
