require 'chat_room'

class MessagePoster

    def self.add_message_to_room(room_key, text, name)
        chat_room = ChatRoom.find_by_room_key room_key
        if chat_room
            message = chat_room.messages.build :text => text, @
        end
    end

end