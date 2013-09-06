AdoptAThing::Application.routes.draw do
  devise_for :users, :controllers => {
    passwords: 'passwords',
    registrations: 'users',
    sessions: 'sessions',
  }

  get '/address', to: 'addresses#show', as: 'address'
  get '/info_window', to:'info_window#index', as: 'info_window'
  get '/sitemap', to: 'sitemaps#index', as: 'sitemap'

  scope '/sidebar', controller: :sidebar do
    get :search, as: 'search'
    get :combo_form, as: 'combo_form'
    get :edit_profile, as: 'edit_profile'
  end

  scope '/mobile', controller: :mobile do
    get :nav, as: 'nav'
    get :sign_in, as: 'sign_in'
    get :sign_up, as: 'sign_up'
    get :edit_profile, as: 'edit_profile'
    get :page, as: 'page'
  end

  resource :reminders
  resource :things
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root to: 'main#index'
end
