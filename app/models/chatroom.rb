require 'random_string_generator'

class Chatroom < ActiveRecord::Base
	attr_accessible :room_name

  has_many :messages, dependent: :destroy
  
  validates_presence_of :room_name

  before_create :set_room_key

  KEY_LENGTH = 20

  def self.destroy_all_older_than(duration_in_seconds)
    since = Time.now.utc - duration_in_seconds
    condition = "updated_at < '#{since}'"
    self.destroy_all condition
  end

  def set_room_key
  	self.room_key = RandomStringGenerator.generate_string KEY_LENGTH
  end

end

# id: integer
# room_key: string
# room_name: string
# created_at: datetime
# updated_at: datetime

