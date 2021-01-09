class AddressesController < ApplicationController
  def index
    @addresses = Address.new
  end

end
