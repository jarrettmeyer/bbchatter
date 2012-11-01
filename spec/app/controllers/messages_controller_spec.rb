require 'spec_helper'
require 'messages_controller'

describe MessagesController, type: :controller do

	describe 'GET messages' do 

		it "returns a JSON object" do
			get :index, { room_key: "" }
			json = JSON.parse response.body
			json.should == []
		end

		it "should update the chatroom" do
			chatroom = create_chatroom
			original_updated_at = chatroom.updated_at
			get :index, { room_key: chatroom.room_key }
			
			new_chatroom = Chatroom.find chatroom.id
			new_chatroom.updated_at.should be > original_updated_at
		end

	end

	def create_chatroom
		chatroom = FactoryGirl.create :chatroom
		chatroom.save!
		chatroom
	end

end