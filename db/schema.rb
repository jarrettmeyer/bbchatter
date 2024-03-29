# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121021142522) do

  create_table "chatrooms", :force => true do |t|
    t.string   "room_key"
    t.string   "room_name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "chatrooms", ["room_key"], :name => "index_chatrooms_on_room_key", :unique => true

  create_table "messages", :force => true do |t|
    t.text     "text"
    t.string   "display_name"
    t.integer  "chatroom_id"
    t.string   "ip_address"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

end
