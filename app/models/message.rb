class Message
  attr_accessible :text, :display_name
  belongs_to :chatroom

  # chatroom_id
  # display_name
  # text
end