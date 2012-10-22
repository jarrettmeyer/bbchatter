class ApplicationController < ActionController::Base
  protect_from_forgery

  def set_last_fetch( chatroom_id )
  	last_fetch = session[:last_fetch] || {}

  	if last_fetch[chatroom_id]
      last_fetch_at = last_fetch[chatroom_id]
      last_fetch[chatroom_id] = Time.now.utc.to_i
      session[:last_fetch] = last_fetch
      Time.at last_fetch_at
    else
      last_fetch_at = Time.now.utc
      last_fetch[chatroom_id] = last_fetch_at.to_i
      session[:last_fetch] = last_fetch
      last_fetch_at
    end
  end

end

