var bbchatter = bbchatter || {};

$(function ( $ ) { 
  'use strict';

  // The ChatRoomView is the wrapper for the application.
  bbchatter.ChatroomView = Backbone.View.extend({

    el: "#chatroom",
    form: $( '#chatter-form' ),
    messageInput: $( '#message-text' ),
    window: $( window ),

    initialize: function () {
      this.bindFormSubmit();
      this.model = new bbchatter.Chatroom();
    },

    bindFormSubmit: function() {
      var self = this,
          text;
      this.form.submit(function ( e ) {
        e.preventDefault();
        text = self.messageInput.val();
        console.log('captured form submit: ' + text);
        self.model.postMessage(text);
        return false;
      });
    },

    //render: function () {
    //  return this;
    //}

    checkForNewMessages: function () {

    },

  });
});
