require 'spec_helper'
require 'messages_controller'

describe MessagesController, type: :controller do

	describe 'GET messages' do 

		it "returns a JSON object" do
			get :index, { room_key: "xyz987" }
			json = JSON.parse response.body
			json.should_not be_nil
		end

	end

	def create_chatroom
		chatroom = FactoryGirl.create :chatroom
		chatroom.save!
		chatroom
	end

end