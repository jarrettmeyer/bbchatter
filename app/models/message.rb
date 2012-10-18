class ChatMessage
  attr_accessible :text, :user_display_name
  belongs_to :chat_room

  # chat_room_id
  # user_display_name
  # text
end