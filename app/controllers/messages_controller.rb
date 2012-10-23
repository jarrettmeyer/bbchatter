class MessagesController < ApplicationController
  
  def index
    @chatroom_id = get_chatroom_id params 
    @messages = get_messages @chatroom_id
    render :json => @messages, :status => :ok
  end

  def create
    @chatroom_id = get_chatroom_id params
    
    @chatroom = Chatroom.find_by_id @chatroom_id
    @message = @chatroom.messages.build.with_new_values params
    @message.save!

    render :json => [ @message ], :status => :created
  end

private

  def get_chatroom_id( params )
    chatroom_id = params[ :chatroom_id ].to_i
  end

  def get_messages( chatroom_id )
    # Get messages for the last 10 seconds.
    since = Time.now - 10
    messages = Message.where("chatroom_id = ? and created_at >= ?", chatroom_id, since)
    messages
  end

end
