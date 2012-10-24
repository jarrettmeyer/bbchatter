require 'spec_helper'


describe TestsController, :type => :controller do 

	describe "GET qunit" do

		it "can render qunit template" do
			get :qunit
			response.should render_template 'qunit'
		end

	end

end
