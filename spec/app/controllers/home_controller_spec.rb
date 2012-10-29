require 'spec_helper'
require 'home_controller'

describe HomeController, :type => :controller do

	describe "GET index" do

		it "can render index template" do
			get :index
			response.should render_template 'index'
		end

	end

	describe "GET about" do

		it "can render about template" do
			get :about
			response.should render_template 'about'
		end

	end

end