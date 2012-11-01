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

		it "returns an OK status" do
			get :index, room_key: ""
			response.status.should == 200 # 200 = OK
		end

	end

	describe 'POST /messages' do

		it "should fetch a chatroom" do
			chatroom = create_chatroom
			post :create, room_key: chatroom.room_key, display_name: "John Doe", text: "Hello, World!"
			assigns(:chatroom).should == chatroom
		end

		it "should add a message to the chatroom" do
			chatroom = create_chatroom
			post :create, room_key: chatroom.room_key, display_name: "John Doe", text: "Hello, World!"
			assigns(:chatroom).messages.count.should == 1
		end

		it "returns a created status" do
			chatroom = create_chatroom
			post :create, room_key: chatroom.room_key, display_name: "John Doe", text: "Hello, World!"
			response.status.should == 201 # 201 = created
		end

	end

	def create_chatroom
		chatroom = FactoryGirl.create :chatroom
		chatroom.save!
		chatroom
	end

end