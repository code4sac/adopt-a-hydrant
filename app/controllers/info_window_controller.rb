class InfoWindowController < ApplicationController
  def index
    #@thing = Thing.find_by_id(params[:thing_id])

    @thing = Thing.find(
      :all,
      :joins => "LEFT JOIN types ON types.id = things.type_id",
      :select => "things.*, types.title AS thing_title, types.action AS thing_action",
      :conditions => ["things.id = ?", params[:thing_id]]
      )
    @thing = @thing[0]

    #if @thing.adopted?
    if !@thing.user_id.nil?
      if user_signed_in? && current_user.id == @thing.user_id
        render("users/thank_you")
      else
        render("users/profile")
      end
    else
      if user_signed_in?
        render("things/adopt")
      else
        render("users/sign_in")
      end
    end
  end
end
