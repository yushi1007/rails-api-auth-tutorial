Rails.application.routes.draw do
  post "/login/google", to: "users#google_login"
  post "/login", to: "users#login"
  post "/signup", to: "users#signup"
  get "/me", to: "users#me"
  patch "/me", to: "users#update"
end
