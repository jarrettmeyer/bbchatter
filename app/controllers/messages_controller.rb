class MessagesController < ApplicationController
  
  def index
    @room_key = params[ :room_key ]
    @messages = get_messages @room_key
    render :json => @messages, :status => :ok
  end

  def create
    @room_key = params[ :room_key ]
    
    @chatroom = Chatroom.find_by_room_key @room_key
    @message = @chatroom.messages.build.with_new_values params
    @message.save!

    render :json => [ @message ], :status => :created
  end

private

  def get_chatroom_id( params )
    chatroom_id = params[ :chatroom_id ].to_i
  end

  def get_messages( room_key )
    # Get messages for the last 10 seconds.
    since = Time.now - 10
    chatroom_id = Chatroom.find_by_room_key room_key
    messages = Message.where("chatroom_id = ? and created_at >= ?", chatroom_id, since)
    messages
  end

end
