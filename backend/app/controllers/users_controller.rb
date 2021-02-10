class UsersController < ApplicationController
  before_action :authenticate, only: [:me, :update]

  # POST /login
  def login
    # TODO: look up a user with username and password
    user = User.first
    render json: user
  end

  # GET /me
  def me
    render json: @current_user
  end

  # PATCH /me
  def update
    @current_user.update(bio: params[:bio], image: params[:image])
    render json: @current_user
  end

end
