class ChatroomsController < ApplicationController

	def create
		@chatroom = Chatroom.new :room_name => params[:room_name]
		@chatroom.save!
		set_last_fetch @chatroom.room_key
		render :json => @chatroom, :status => :created
	end

end