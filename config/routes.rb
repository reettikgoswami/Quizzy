Rails.application.routes.draw do

  resource :sessions, only: [:create, :destroy, :show]
  resources :quizzes, only: [:create, :index, :show, :destroy, :update]
  
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
