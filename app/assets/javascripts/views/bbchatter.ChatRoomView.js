var bbchatter = bbchatter || {};

$(function ( $ ) { 
  'use strict';

  // The ChatRoomView is the wrapper for the application.
  bbchatter.ChatroomView = Backbone.View.extend({

    createMessageUrl: '/messages',
    el: "#chatroom",
    latestMessagesUrl: '/messages/latest',
    messageInput: $( '#message-text' ),
    messages: [],
    model: null,

    initialize: function ( options ) {
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

    fetchLatestMessages: function () {
      var index, self = this, message;
      $.get(this.latestMessagesUrl, function ( response ) {
        for (index = 0; index < response.length; index += 1) {
          message = new bbchatter.Message( response[index] );
          self.model.addMessage( message );
        }
      });
    }

  });
});