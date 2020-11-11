class BuyersController < ApplicationController
  def index
  end

  def done
  end

  def deliverry
    @user = User.new
  end
end