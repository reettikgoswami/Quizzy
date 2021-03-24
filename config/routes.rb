Rails.application.routes.draw do

  resource :sessions, only: [:create, :destroy, :show]

  resources :quizzes , except: [:new, :edit] do
    resources :questions, except: [:new, :edit, :index]
  end
  
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
