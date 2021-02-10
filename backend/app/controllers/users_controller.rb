class UsersController < ApplicationController
  before_action :authenticate, only: [:me, :update]

  # POST /login
  def login
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      token = JWT.encode({ user_id: user.id }, 'my_secret', 'HS256')
      render json: { user: UserSerializer.new(user), token: token }
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
  end

  # POST /signup
  def signup
    user = User.create(user_params)
    if user.valid?
      token = JWT.encode({ user_id: user.id }, 'my_secret', 'HS256')
      render json: { user: UserSerializer.new(user), token: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
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

  private

  def user_params
    params.permit(:username, :password, :image, :bio)
  end

end
