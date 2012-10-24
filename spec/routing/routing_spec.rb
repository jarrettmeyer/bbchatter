require "spec_helper"

describe "application routing" do
	
	it "can handle the root route" do
		{ :get => "/" }.should route_to( :controller => "home", :action => "index" )
	end

	it "can route to chatrooms" do
		{ :post => "/chatrooms/join" }.should route_to :controller => "chatrooms", :action => "join"
	end

	it "can route to messages" do
		{ :get => "/messages" }.should route_to :controller => "messages", :action => "index"
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

end
