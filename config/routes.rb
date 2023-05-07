Rails.application.routes.draw do

  post '/signup', to: "users#create"
  get '/me', to: "users#show"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  post '/profile/avatar', to: "users#avatarchange"
  post '/travelogue/:id/cover', to: "travelogues#coverimagechange"

  post '/bookmarks', to: "saved_posts#create"
  delete '/bookmarks/:id', to: "saved_posts#destroy"

  resources :travelogues, only: [:index, :show, :create, :update, :destroy]
  # these will need to be removed later
  resources :users, only: [:index, :create, :update]
  resources :tags, only: [:index, :destroy]

end