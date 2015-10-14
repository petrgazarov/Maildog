Rails.application.routes.draw do
  root to: "static_pages#mail"

  resource :session, only: [:new, :create, :destroy] do
    post :create_guest
  end

  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :emails, except: [:new, :edit]

    get "/search", to: "email_threads#search"
    resource  :user
    resources :thread_labels, only: [:create, :destroy]

    resource :session do
      post :fetch
    end

    resources :email_threads, only: [:show, :destroy, :update] do
      collection do
        get  :inbox
        get  :starred
        get  :sent
        get  :drafts
        get  :trash
        post :move_to_trash
        post :recover
      end

      resources :labels, only: [:index]
    end

    resources :labels, except: [:new, :edit] do
      member do
        get :threads
      end
    end
  end
end
