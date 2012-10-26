var bbchatter = bbchatter || {};

$(function ( $ ) { 
  'use strict';

  // The ChatRoomView is the wrapper for the application.
  bbchatter.ChatroomView = Backbone.View.extend({

    createMessageUrl: '',
    el: "#chatroom",
    fetchMessagesUrl: '',
    messages: [],
    model: null,

    events: {
      "click input[name=room_type]": "onRoomTypeClicked",
      "click #start-chatting": "onStartChattingClicked"
    },

    initialize: function ( options ) {
      console.log( "initializing ChatroomView" );
      
      this.messageInput = $( "#message-text" );

      this.model = ( options && options.model ) || new bbchatter.Chatroom();

      
    },

    addMessage: function ( messageText ) {
      var message = new bbchatter.Message({ text: messageText, is_owned: true }),
          messageView,
          self = this;

      this.model.addMessage( message );

      $.post(this.createMessageUrl, message.toJSON(), function ( response ) { 
        message.set( 'id', response.id );
      });

      messageView = new bbchatter.MessageView({ model: message })
      messageView.render();
      
      return messageView;
    },

    createChatroom: function () {
      console.log( "in createChatroom" );
      this.model.set( "room_name", $( "#room_name" ).val() );
    },

    fetchLatestMessages: function () {
      var index, self = this, message;
      $.get(this.latestMessagesUrl, function ( response ) {
        for (index = 0; index < response.length; index += 1) {
          message = new bbchatter.Message( response[index] );
          self.model.addMessage( message );
        }
      });
    },

    onRoomTypeClicked: function ( e ) {
      this.room_type = $( "input[name=room_type]:checked" ).val();
      console.log( "room type: " + this.room_type );
    },

    onStartChattingClicked: function ( e ) {
      console.log( "onStartChattingClicked" );
      e.preventDefault();
      e.stopPropagation();

      switch (this.room_type) {
        case "create":
          this.createChatroom();
          break;
        case "join"
          this.joinChatroom();
          break;
      }

      return false;
    },

    joinChatroom: function () {
      console.log( "joinChatroom" );
    }

  });
});