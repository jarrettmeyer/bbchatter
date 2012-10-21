class MessagesController < ApplicationController
  
  def index
    @messages = Message.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @messages }
    end
  end

  def create
    @chatroom_id = params[:chatroom_id]
    @chatroom = Chatroom.find_by_id @chatroom_id
    @message = @chatroom.messages.build
    @message.set_new_values params
    @message.save!

    render :json => @message, :status => :created
  end

end
