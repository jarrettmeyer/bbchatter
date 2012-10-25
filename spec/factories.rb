require 'factory_girl'

FactoryGirl.define do

	factory :chatroom do
		room_name "My Chatroom"
	end

	factory :message do
		display_name "Joe User"
		text "Hello, World!"
	end

end
