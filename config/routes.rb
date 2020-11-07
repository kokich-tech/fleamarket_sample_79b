Rails.application.routes.draw do
  root 'homes#index'
  resources :items
  
end
