class Message < ActiveRecord::Base

	# Associations
  belongs_to :chatroom

  # Validations
  validates_presence_of :display_name
  validates_presence_of :text

  def set_new_values( params )
  	self.text = params[:text]
  	self.display_name = params[:display_name]
  end

end

# id: integer
# text: text
# display_name: string
# ip_address: string

