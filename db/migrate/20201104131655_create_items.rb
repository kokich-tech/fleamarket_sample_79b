class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.integer :size_id, null: false
      t.integer :item_condition_id, null: false
      t.integer :postage_payer_id,  null: false
      t.integer :postage_type_id, null: false
      t.integer :prefecture_id, null: false
      t.integer :estimated_shipping_date_id, null: false
      t.text :item_description, null: false
      t.integer :price, null: false
      t.string  :brand_id
      t.string :trading_status
      t.integer :category_id, null: false
      t.timestamps
    end
  end
end
