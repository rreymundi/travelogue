Rails.application.routes.draw do

  post '/signup', to: "users#create"

  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  resources :travelogues, only: [:index, :create, :update, :destroy]
  resources :collections, only: [:index]
  # this will need to be removed later
  resources :users, only: [:index, :create]

end