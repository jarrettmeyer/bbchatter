class MessagesController < ApplicationController

    def index
        @chat_room_id = params[:chat_room_id]
        @chat_room = ChatRoom.find_by_id(@chat_room_id)
    end

end