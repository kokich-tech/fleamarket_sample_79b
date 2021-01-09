class BuyersController < ApplicationController

  require 'payjp'
  before_action :set_card, :set_item

  def index
    if @card.blank?
      redirect_to new_card_path
    else
      Payjp.api_key = ENV['PAYJP_SECRET_KEY']
      customer = Payjp::Customer.retrieve(@card.customer_id)
      @default_card_information = customer.cards.retrieve(@card.card_id)
      
    end
  end

  def pay
    Payjp.api_key = ENV['PAYJP_SECRET_KEY']
    Payjp::Charge.create(
      :amount => @item.price,
      :customer => @card.customer_id,
      :currency => 'jpy',
    )
    if @item.update!(trading_status: "売却済")
      redirect_to  done_item_buyers_path, item_id: @item
    else
      redirect_to  item_buyers_path(@item)
    end
  end

  def done
    Buyer.create(item_id: @item.id,user_id: current_user.id)

  end

  def deliverry
    @user = User.new
  end

  private

  def set_card
    @card = Card.find_by(user_id: current_user.id)
  end

  def set_item
    @item = Item.find(params[:item_id])
  end
end