Bbchatter::Application.routes.draw do

  # Nested resources for creating & fetching messages
  match 'chatrooms/:room_key/messages' => 'messages#index', :via => :get
  match 'chatrooms/:room_key/messages' => 'messages#create', :via => :post

  match 'chatrooms' => 'chatrooms#create', :via => :post
  match 'chatrooms/:room_key/join' => 'chatrooms#join', :via => :post
  
  match 'qunit' => 'tests#qunit', :via => :get
  
  root :to => 'home#index'

end
