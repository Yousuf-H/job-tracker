Rails.application.routes.draw do
  get "health" => "health#show", as: :rails_health_check
end
