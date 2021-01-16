class Addresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.integer :postal_code
      t.integer :prefecture_id
      t.text :city
      t.text :house_number
      t.text :building
      t.integer :telephone
      t.timestamps
      t.integer :user_id
    end
  end
end
