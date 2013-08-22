class Type < ActiveRecord::Base
  attr_accessible :action, :id, :title
  has_many :things
end
