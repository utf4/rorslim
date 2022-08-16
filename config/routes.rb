Rails.application.routes.draw do
  resources :users, only: [:index, :new, :create]
  resources :employments
  root "users#index"
end
