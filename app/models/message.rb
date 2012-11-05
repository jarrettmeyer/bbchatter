class Message < ActiveRecord::Base

  # Associations
  belongs_to :chatroom

  # Validations
  validates_presence_of :display_name
  validates_presence_of :text

  LATEST_DURATION_IN_SECONDS = 10

  def self.find_latest(message_ids = nil)
    since = Time.now - LATEST_DURATION_IN_SECONDS
    message_ids = [-1] unless message_ids && !message_ids.empty?
    self.where("created_at >= ? and id not in (?)", since, message_ids)
  end

  def with_new_values( params )
  	raise "Unable to set values on existing record" unless new_record?

  	self.text = params[:text]
  	self.display_name = params[:display_name]
  	self
  end

end

# id: integer
# text: text
# display_name: string
# ip_address: string
# created_at: datetime
# updated_at: datetime

