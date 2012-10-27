var bbchatter = bbchatter || {};

$(function ( $ ) { 
  'use strict';

  // The ChatRoomView is the wrapper for the application.
  bbchatter.ChatroomView = Backbone.View.extend({

    createChatroomUrl: '/chatrooms',
    createMessageUrl: '',
    el: "#chatroom",
    fetchIntervalInMS: 3000,
    messageInput: $( '#message-text' ),
    messages: [],
    model: null,

    events: {
      "click input[name=room_type]": "selectRoomType",
      "click #start-chatting": "startChatting"
    },

    initialize: function ( options ) {
      this.model = this.model || new bbchatter.Chatroom();
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

    beginFetchingMessages: function () {
      var self = this,
          index, 
          message,
          url = '/chatrooms/' + this.model.get ( 'room_key' ) + '/messages?' + Math.random();

      window.setInterval( function () { 
        $.get( url, function ( response ) {
          for ( index = 0; index < response.length; index += 1 ) {
            message = new bbchatter.Message( response[index] );
            self.model.addMessage( message );
          }
        });
      }, self.fetchIntervalInMS );
    },

    createChatroom: function () {
      var self = this;
      
      $.post( this.createChatroomUrl, { room_name: this.model.get( 'room_name' ) }, function ( response ) {
        self.model.set( 'id', response.id );
        self.model.set( 'room_key', response.room_key );
        self.initializeChatroomAfterLoad();
      });
    },

    initializeChatroomAfterLoad: function () {
      this.setChatHeader();
      this.setCreateMessageUrl();
      this.beginFetchingMessages();
    },

    joinChatroom: function () {
      var self = this,
          url = '/chatrooms/' + self.model.get( 'room_key' ) + '/join';
      
      $.post( url, function ( response ) {
        self.model.set( 'id', response.id );
        self.model.set( 'room_name', response.room_name);
        self.initializeChatroomAfterLoad();
      });
    },

    removeOverlay: function () {
      $( '#overlay' ).hide();
    },

    selectRoomType: function () {
      var room_type = $( 'input[name=room_type]:checked' ).val();
      
      this.model.set( 'room_type', room_type );
      if ( room_type === 'create' ) {
        $( '#room_key_fields' ).slideUp();
        $( '#room_name_fields' ).slideDown();
      } else {
        $( '#room_name_fields' ).slideUp();
        $( '#room_key_fields' ).slideDown();
      }
    },

    setChatHeader: function () {
      $( '#chatroom-name' ).html( this.model.get( 'room_name' ) );
      $( '#chatroom-key' ).html( this.model.get( 'room_key' ) );
    },

    setCreateMessageUrl: function () {
      this.createMessageUrl = '/chatrooms/' + this.model.get ( 'room_key' ) + '/messages';
    },

    startChatting: function ( ) {
      console.log( 'start chatting' );
      this.model.set( 'display_name', $( '#display_name' ).val() );

      if ( this.model.get( 'room_type' ) === 'create') {
        this.model.set( 'room_name', $( '#room_name' ).val() );
        this.createChatroom();
      } else {
        this.model.set( 'room_key', $( '#room_key' ).val() );
        this.joinChatroom();
      }
      this.removeOverlay();
    }

  });
});