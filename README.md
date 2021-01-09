# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## usersテーブル

|Column|Type|Option|
|------|----|------|
|nickname|string|null: false, unique: true, index:true|
|email|string|null: false, unique: true, index:true|
|password|string|null: false|
|familyname|string|null: false|
|familyname_kana|string|null: false|
|firstname|string|null: false|
|firstname_kana|string|null: false|
|birthday|date|null: false|
|address_id|references|null: false, foreign_key: true|
|payment_id|references|null: false, foreign_key: true|

### Association
- has_many :seller_items, foreign_key"seller_id", class_name: "items"
- has_many :buyer_items, foreign_key"buyer_id", class_name: "items"
- has_many :comments
- has_many :items, through: :comments, dependent: :destroy
- has_many :goods
- has_many :items, through: :goods, dependent: :destroy
- has_many :payments, dependent: :destroy
- belongs_to :confirm
- belongs_to :profile


## profilesテーブル

|Column|Type|Option|
|------|----|------|
|postal_code|integer|null: false|
|prefecture|string|null: false|
|city|text|null: false|
|house_number|text|null: false|
|building|text|
|telephone|integer|

### Association
- belongs_to :user


## paymentsテーブル

|Column|Type|Option|
|------|----|------|
|card_company|string|null:false|
|card_number|integer|null: false|
|expiration_year|integer|null: false|
|expiration_month|integer|null: false|
|security_code|integer|null: false|

### Association
- belongs_to :user
- belongs_to :confirm


## itemsテーブル

|Column|Type|Options|
|------|----|-------|
|name|integer|null:false, index:true|
|description|text|null: false|
|status_id|references|null: false, foreign_key: true|
|condition_id|references|null: false, foreign_key: true|
|listing_time|timestamp|null: false|
|seller|references|null: false, foreign_key: true|
|buyer|references|null: false, foreign_key: true|
|brand_name_id|references|foreign_key: true|
|category_id|references|null: false, foreign_key: true|
|img_id|references|foreign_key: true|
|postage_payer_id|references|null: false, foreign_key: true|
|purchase_time|timestamp|null: false|
|shipment_source|string|null: false|
|days_to_ship|string|null: false|
|price|integer|null: false|

### Association

- has_many  :item_images, dependent: :destroy 
- has_many  :comments, dependent: :destroy 
- has_many  :users, through: :comments, dependent: :destroy 
- has_many  :goods, dependent: :destroy 
- has_many  :user, through: :goods, dependent: :destroy
- belongs_to  :seller, class_name:"user"
- belongs_to  :buyer, class_name:"user
- belongs_to_active_hash  :brand
- belongs_to_active_hash  :category
- belongs_to_active_hash  :status
- belongs_to_active_hash  :condition
- belongs_to_active_hash  :postage_payer
- belongs_to_active_hash  :confirm


### brandsテーブル

|Column|Type|Options|
|------|----|-------|
|brand_name|string|null: false, index: true|

### Association

- belongs_to  :item


### item_imagesテーブル

|Column|Type|Options|
|------|----|-------|
|item_id|references|null: false, foreign_key: true|

### Association
- belongs_to  :item


### categoriesテーブル
|Column|Type|Options|
|------|----|-------|
|category_name|string|null: false|

### Association
- belongs_to  :item


### statusesテーブル

|Column|Type|Options|
|------|----|-------|
|item_status|string|null: false|

### Association

- belongs_to  :item


### conditionsテーブル

|Column|Type|Options|
|------|----|-------|
|item_condition|string|null: false|

### Association

- belongs_to  :item


### postage_payersテーブル
|Column|Type|Options|
|------|----|-------|
|postage_payer|string|null :false|

### Association

- belongs_to  :item


### commentsテーブル
|Column|Type|Options|
|------|----|-------|
|item_id|references|null: false, foreign_key: true|	
|user_id|references|null: false, foreign_key: true|	
|comment|text|blank　:true|	
|input_time|date|null: false|

### Association

- belongs_to : item
- belongs_to : user


## goodsテーブル

|Column|Type|Option|
|------|----|------|
|user_id|references|null: false, foreign_key: true|
|item_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :item


## confirmsテーブル

|Column|Type|Option|
|------|----|------|
|item_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|
|payment_id|references|null: false, foreign_key: true|
|purchase_time|timestamp|null: false|

### Association
- belongs_to :user
- belongs_to :item
- belongs_to :payment





