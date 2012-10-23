require "spec_helper"

describe "application routing" do
	
	it "can route to messages" do
		{ :get => "/messages" }.should route_to :controller => "messages", :action => "index"
	end

	it "can handle the default route" do
		{ :get => "/" }.should route_to( :controller => "home", :action => "index" )
	end

end
