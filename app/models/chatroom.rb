class Chatroom
  has_many :messages, :class_name => "chat_message"
  
  def generate_uuid
    self.id = UUIDTools::UUID.random_create.to_s
  end

  # uuid
  # room_name
  # room_key
  # created_by
end