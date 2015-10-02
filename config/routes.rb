Rails.application.routes.draw do
  root to: "static_pages#mail"

  resource :session, only: [:new, :create, :destroy] do
    post :create_guest
  end
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :emails do
      collection do
        get  :inbox
        get  :starred
        get  :sent
        get  :drafts
        get  :trash
        post :send
      end
    end

    get "/search", to: "emails#search"

    resource :session do
      post :fetch
    end
    resources :threads, only: [:show, :destroy]
    resources :emails, except: [:new, :edit]
    resource  :user
    resources :labels, except: [:new, :edit] do
      member do
        get :emails
      end
    end
    resources :email_labels, only: [:create]
  end
end
