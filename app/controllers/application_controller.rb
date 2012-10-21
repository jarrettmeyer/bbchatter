class ApplicationController < ActionController::Base
  protect_from_forgery

  def get_last_fetch(room_key)
  	last_fetch = session[:last_fetch] || {}
  	last_fetch_at = last_fetch[room_key] || Time.now
  end

  def set_last_fetch(room_key)
  	last_fetch = session[:last_fetch] || {}
  	last_fetch[room_key] = Time.now
  	session[:last_fetch] = last_fetch.to_json
  end

end

