Rails.application.routes.draw do

  post '/signup', to: "users#create"
  get '/me', to: "users#show"

  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  post '/profile/avatar', to: "users#avatarchange"

  resources :travelogues, only: [:index, :create, :update, :destroy]
  resources :collections, only: [:index]
  resources :locations, only: [:index]
  # this will need to be removed later
  resources :users, only: [:index, :create, :update]

end