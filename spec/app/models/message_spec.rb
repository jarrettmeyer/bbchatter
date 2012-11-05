require 'spec_helper'
require 'message'

describe Message do
	
	it "can be constructed" do
		message = Message.new
		message.should_not be_nil
	end

	it "has a valid factory" do
		FactoryGirl.build( :message ).should be_valid
	end

	it "requires text" do
		FactoryGirl.build( :message, :text => "" ).should_not be_valid
	end

	it "requires a display name" do
		FactoryGirl.build( :message, :display_name => "" ).should_not be_valid
	end

	it "returns itself when created with new values" do
		message_1 = Message.new
		message_2 = message_1.with_new_values({})
		
		# Using 'equal' in this way checks that they are actually the same
		# object (i.e. have the same object ID).
		message_1.should equal message_2
	end

	it "can be created with text value" do
		message = Message.new.with_new_values :text => "Hello, World!"
		message.text.should == "Hello, World!"
	end

	it "can be created with display_name value" do
		message = Message.new.with_new_values :display_name => "John Doe"
		message.display_name.should == "John Doe"
	end

	it "ignores unrecognized hash values" do
		message = Message.new.with_new_values :chatroom_id => 123
		message.chatroom_id.should be_nil
	end

  it "find latest does not return old messages" do
    message = FactoryGirl.build :message
    message.save!
    time_in_future = 1.minute.from_now
    Time.stub!(:now).and_return(time_in_future)
    messages = Message.find_latest
    messages.count.should == 0
  end

end
