class DataController < ApplicationController
  before_filter :authenticate_user!
  def index
    # Redirect non-admin users back to main page with notice to login as admin
    if !current_user.admin?
      redirect_to root_path, notice: "Must be Administrator"
    end # End Redirect
    
    render :partial => 'data/main'
  end
end
