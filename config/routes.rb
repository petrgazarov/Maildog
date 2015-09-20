Rails.application.routes.draw do
  root to: "static_pages#mail"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :emails do
      collection do
        get :inbox
        get :starred
        get :sent
        get :drafts
      end
    end
    resource :sessions, only: [:show, :create, :destroy]
    resources :threads, only: [:show, :destroy]
    resources :emails, except: [:new, :edit]
    resource :user
  end
end
