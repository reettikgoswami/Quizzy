Rails.application.routes.draw do

  resource :sessions, only: [:create, :destroy, :show]
  
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
