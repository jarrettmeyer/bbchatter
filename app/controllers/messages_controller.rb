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

    #render :json => @messages, :status => :created
    render :json => [@message], :status => :created
  end

  def get_messages( chatroom_id )
    # Get messages for the last 10 seconds.
    since = Time.now - 10
    messages = Message.where("chatroom_id = ? and created_at >= ?", chatroom_id, since)
    messages
  end

end
