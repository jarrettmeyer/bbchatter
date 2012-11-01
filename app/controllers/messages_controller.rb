class MessagesController < ApplicationController
  
  def index
    @room_key = params[ :room_key ]
    @messages = get_messages @room_key
    add_message_ids_to_cache @messages.map &:id

    render :json => @messages, :status => :ok
  end

  def create
    @room_key = params[ :room_key ]
    
    @chatroom = Chatroom.find_by_room_key @room_key
    @message = @chatroom.messages.build.with_new_values params
    @message.save!
    add_message_id_to_cache @message.id

    render :json => @message, :status => :created
  end

private

  def get_messages( room_key )
    # Get messages for the last 10 seconds.
    since = Time.now - 10
    chatroom = Chatroom.find_by_room_key room_key
    if chatroom
      chatroom.touch
      message_ids = session[:message_ids] || [-1]
      messages = chatroom.messages.where("created_at >= ? and id not in (?)", since, message_ids)
      messages
    else
      []
    end
  end

  def add_message_id_to_cache(message_id)
    if session[:message_ids]
      session[:message_ids] << message_id
    else
      session[:message_ids] = [message_id]
    end
  end

  def add_message_ids_to_cache(message_ids)
    message_ids.each { |id| add_message_id_to_cache id }
  end

end
