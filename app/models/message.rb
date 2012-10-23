class Message < ActiveRecord::Base

	# Associations
  belongs_to :chatroom

  # Validations
  validates_presence_of :display_name
  validates_presence_of :text

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

