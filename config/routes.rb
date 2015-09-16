Rails.application.routes.draw do
  root to: "static_pages#mail"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :emails, except: [:new, :edit]
    resource :user
  end
end
