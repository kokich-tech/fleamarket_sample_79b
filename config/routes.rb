Rails.application.routes.draw do

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    }
    devise_scope :user do
      get  'addresses', to: 'users/registrations#new_address'
      post 'addresses', to: 'users/registrations#create_address'
    end
    
  resources :addresses, only: :index

  devise_scope :user do
    get 'users/sign_up/complete', to: 'users/registrations#complete'
  end


  root 'homes#index'

  resources :items do
    collection do
      get 'category/get_category_children', to: 'items#get_category_children', defaults: { format: 'json' }
      get 'category/get_category_grandchildren', to: 'items#get_category_grandchildren', defaults: { format: 'json' }
    end
    resources :buyers, only: [:index] do
      collection do 
        get 'done', to: 'buyers#done'
        post 'pay', to: 'buyers#pay'
      end
    end
  end
  resources :users
  resources :item_images

  resources :card, only: [:new, :show, :destroy] do
    collection do
      post 'index', to: 'card#index'
      post 'pay', to: 'card#pay'
      post 'delete', to: 'card#destroy'
    end
  end
end



