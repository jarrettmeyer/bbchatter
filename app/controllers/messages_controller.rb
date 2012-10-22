class MessagesController < ApplicationController
  
  def index
    @messages = get_messages params[:chatroom_id].to_i
    render :json => @messages, :status => :ok
  end

  def create
    @chatroom_id = params[:chatroom_id].to_i
    @last_fetch_at = set_last_fetch @chatroom_id
    
    @chatroom = Chatroom.find_by_id @chatroom_id
    @message = @chatroom.messages.build
    @message.set_new_values params
    @message.save!

    @messages = get_messages @chatroom_id

    #render :json => @messages, :status => :created
    render :json => [], :status => :created
  end

  def get_messages( chatroom_id )
    last_fetch_at = set_last_fetch chatroom_id
    messages = Message.where("chatroom_id = ? and created_at >= ?", chatroom_id, last_fetch_at)
    messages
  end

end
