class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text 			:text
      t.string 		:display_name
      t.integer		:chatroom_id
      t.string		:ip_address

      t.timestamps
    end
  end
end
