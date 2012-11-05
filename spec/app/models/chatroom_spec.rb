require "spec_helper"

describe Chatroom do
	
	it "can be instantiated" do
		Chatroom.new.should be_instance_of Chatroom
	end

	it "has a valid factory" do
		FactoryGirl.build( :chatroom ).should be_valid
	end

	it "requires a room name" do
		FactoryGirl.build( :chatroom, :room_name => "" ).should_not be_valid
		FactoryGirl.build( :chatroom, :room_name => nil ).should_not be_valid
	end

	it "sets the room key on create" do
		chatroom = FactoryGirl.build :chatroom
		chatroom.room_key.should be_nil
		chatroom.new_record?.should be_true

		chatroom.save
		chatroom.room_key.should_not be_nil
		chatroom.new_record?.should be_false
	end

  it "can delete old chatrooms" do
    chatroom = FactoryGirl.build :chatroom
    chatroom.save!
    one_hour_from_now = Time.now + 3600
    Time.stub!(:now).and_return(one_hour_from_now)
    Chatroom.destroy_all_older_than 20
    Chatroom.count.should == 0
  end

end

