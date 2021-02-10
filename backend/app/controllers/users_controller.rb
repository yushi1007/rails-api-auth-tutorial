class UsersController < ApplicationController
  before_action :authenticate, only: [:me, :update]

  # POST /login
  def login
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      render json: user
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
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
