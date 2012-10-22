class ChatroomsController < ApplicationController

	def index
		@chatrooms = Chatroom.all
	end

	def create
		@chatroom = Chatroom.new :room_name => params[:room_name]
		@chatroom.save!
		set_last_fetch @chatroom.id
		render :json => @chatroom, :status => :created
	end

	def join
		@chatroom = Chatroom.find_by_room_key params[:room_key] 
		if @chatroom
			set_last_fetch @chatroom.id
			render :json => @chatroom, :status => :ok
		else
			render :json => nil, :status => :notfound
		end
	end

end