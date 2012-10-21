var bbchatter = bbchatter || {};

$(function ( $ ) { 
  'use strict';

  // The ChatRoomView is the wrapper for the application.
  bbchatter.ChatRoomView = Backbone.View.extend({

    el: "#chatroom",

    messageInput: $( '#message-text' ),

    window: $( window ),

    initialize: function () {
      var self = this;
      //console.log('initializing chat room view');
      self.window.resize(self.updateMessageInputWidth);
      self.updateMessageInputWidth();
    },

    //render: function () {
    //  return this;
    //}

    updateMessageInputWidth: function () {
      var self = this,
          screenWidth = self.window.width();
      if (self.messageInput) {
        self.messageInput.width(screenWidth - 24);
      }
    }

  });
});
