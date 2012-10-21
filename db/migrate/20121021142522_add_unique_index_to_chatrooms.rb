class AddUniqueIndexToChatrooms < ActiveRecord::Migration
  def change
  	add_index :chatrooms, :room_key, :unique => true
  end
end
