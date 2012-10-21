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

    messageText: $( '#message-text' ),

    initialize: function () {
      //this.bindFormSubmit();
      this.model = new bbchatter.Chatroom();
    },

    start: function () {
      console.log('start clicked');
      this.model.set('display_name', $( '#display_name' ).val());
      this.model.set('room_name', $( '#room_name' ).val());
      this.model.set('room_key', $( '#room_key' ).val());
      $( '#overlay' ).hide();
      this.model.start();
    },

    addMessage: function ( e ) {
      e.preventDefault();
      e.stopPropagation();
      this.model.addMessage( this.messageText.val() );
      return false;
    },

    onJoinClicked: function () {
      var value = $( 'input[name=room_type]:checked' ).val();
      //console.log('type: ' + value);
      if ( value === 'create' ) {
        this.model.room_type = 'create';
        $( '#room_key_fields' ).slideUp();
        $( '#room_name_fields' ).slideDown();
      } else {
        this.model.room_type = 'join';
        $( '#room_name_fields' ).slideUp();
        $( '#room_key_fields' ).slideDown();
      }
    }

  });
});
