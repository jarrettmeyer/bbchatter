require "spec_helper"

describe "application routing" do
	
	it "can handle the root route" do
		{ :get => "/" }.should route_to( :controller => "home", :action => "index" )
	end

	it "can route to join chatrooms" do
		{ :post => "/chatrooms/abc123/join" }.should route_to :controller => "chatrooms", :action => "join", :room_key => "abc123"
	end

	it "should not route to message listing" do
		{ :get => "/messages" }.should_not be_routable
	end

	it "can route create message requests to nested resource" do
		{ :post => "/chatrooms/abc123/messages" }.should route_to :controller => "messages", :action => "create", :room_key => "abc123"
	end

	it "can route list message requests to nested resource" do
		{ :get => "/chatrooms/def456/messages" }.should route_to :controller => "messages", :action => "index", :room_key => "def456"
	end

	it "can route to qunit" do
		{ :get => "/qunit" }.should route_to :controller => "tests", :action => "qunit"
	end

	it "should not route to chatroom listing" do
		{ :get => "/chatrooms" }.should_not be_routable
	end 

end
