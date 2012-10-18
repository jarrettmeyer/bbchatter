class ChatRoom
    has_many :messages, :class_name => "chat_message"

    # id
    # room_name
    # room_key
    # created_by
end