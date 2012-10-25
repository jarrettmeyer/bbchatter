require "spec_helper"
require "chatrooms_controller"

describe ChatroomsController, :type => :controller do

	describe "post create request" do
		
		it "returns json" do
			post :create, { :room_name => "Hello, World!" } 
			json = JSON.parse response.body

			#puts "JSON: #{json}"
			json.should_not be_nil
		end

		it "assigns a valid model" do
			post :create, { :room_name => "Hello, World!" }
			assigns( :chatroom ).should be_an_instance_of Chatroom
		end

	end

	describe "post join request" do

		it "returns json" do
			chatroom = Chatroom.new({ :room_name => "Hello, World!" })
			chatroom.save!
			room_key = chatroom.room_key
			post :join, { :room_key => room_key }
			json = JSON.parse response.body
			json.should_not be_nil
		end

		it "fetchs the expected model" do
			chatroom = Chatroom.new({ :room_name => "Hello, World!" })
			chatroom.save!
			room_key = chatroom.room_key
			post :join, { :room_key => room_key }
			assigns( :chatroom ).id.should == chatroom.id
		end

	end

end