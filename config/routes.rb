Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  root 'homes#index'
  resources :items
  resources :buyers do
    collection do
      get 'done'
      get 'delivery'
    end
  end
end


