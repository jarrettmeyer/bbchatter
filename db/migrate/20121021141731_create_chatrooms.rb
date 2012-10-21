class CreateChatrooms < ActiveRecord::Migration
  def change
    create_table :chatrooms do |t|
    	t.string :room_key
      t.string :room_name
      t.timestamps
    end
  end
end
