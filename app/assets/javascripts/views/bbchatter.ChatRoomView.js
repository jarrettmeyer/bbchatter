var bbchatter = bbchatter || {};

$(function ( $ ) { 
  'use strict';

  // The ChatRoomView is the wrapper for the application.
  bbchatter.ChatroomView = Backbone.View.extend({

    el: "#chatroom",
    
    events: {
      "submit #chatter-form": "addMessage",
      "click input[name=room_type]": "onJoinClicked",
      "click #start-chatting": "start"
    },

    initialize: function () {
      //this.bindFormSubmit();
      this.model = new bbchatter.Chatroom();
    },

    start: function () {
      console.log('start clicked');
      this.model.display_name = $( '#display_name' ).val();
      this.model.room_type = $( 'input[name=room_type]:checked' ).val();
      $( '#overlay' ).hide();
    },

    addMessage: function ( e ) {
      var self = this,
          text = this.messageInput.val();

      e.preventDefault();
      e.stopPropagation();

      self.model.addMessage(text);
    },

    //render: function () {
    //  return this;
    //}

    checkForNewMessages: function () {

    },

    onJoinClicked: function () {
      var value = $( 'input[name=room_type]:checked' ).val();
      console.log('type: ' + value);
      if (value === 'join') {
        
      }
    }

  });
});
