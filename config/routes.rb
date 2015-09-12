Rails.application.routes.draw do
  root to: "sessions#new"

  resource :session, only: [:new, :create]
end
