class Item < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  belongs_to_active_hash :size
  belongs_to_active_hash :item_condition
  belongs_to_active_hash :postage_payer
  belongs_to_active_hash :estimated_shipping_date
  belongs_to_active_hash :postage_type

  validates :name, length: { in: 1..40 }
  validates :item_description, length: { in: 1..1000 }

  with_options presence: true do
    validates :size_id
    validates :item_condition_id
    validates :postage_payer_id
    validates :postage_type_id
    validates :prefecture_id
    validates :estimated_shipping_date_id
    validates :price
    validates :trading_status
  end
  belongs_to :brand, optional: true
  belongs_to :category, optional: true
  has_many :item_images, dependent: :destroy
  accepts_nested_attributes_for :item_images, allow_destroy: true

  belongs_to :user
  has_one :buyer
end
