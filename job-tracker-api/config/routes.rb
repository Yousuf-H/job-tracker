Rails.application.routes.draw do
  get "health" => "health#show", as: :rails_health_check

  resources :applications, only: [:index, :show, :create, :update, :destroy]
end
