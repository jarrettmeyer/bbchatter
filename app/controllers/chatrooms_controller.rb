class ChatroomsController < ApplicationController

	def index
		@chatrooms = Chatroom.all
	end

	def create
		@chatroom = Chatroom.new :room_name => params[:room_name]
		@chatroom.save!
		render :json => @chatroom, :status => :created
	end

	def join
		@chatroom = Chatroom.find_by_room_key params[:room_key] 
		if @chatroom
			render :json => @chatroom, :status => :ok
		else
			render :json => nil, :status => :notfound
		end
	end

end