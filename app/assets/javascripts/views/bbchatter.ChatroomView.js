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
      "click #start-chatting": "startChatting",
      "submit #chatter-form": "submitChatterForm"
    },

    initialize: function ( options ) {
      this.model = this.model || new bbchatter.Chatroom();
    },

    beginFetchingMessages: function () {
      var self = this,
          index, 
          message,
          messageView,
          url = '/chatrooms/' + this.model.get ( 'room_key' ) + '/messages?' + Math.random();

      window.setInterval( function () { 
        $.get( url, function ( response ) {
          for ( index = 0; index < response.length; index += 1 ) {
            message = new bbchatter.Message( response[index] );
            if ( self.model.addMessage( message ) ) {
              self.createMessageView( message );
            }
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

    createMessage: function ( messageText ) {
      var message = this.model.buildMessage({ text: messageText, is_owned: true }),
          messageView,
          self = this;

      $.post(this.createMessageUrl, message.toJSON(), function ( response ) { 
        message.set( 'id', response.id );
        message.set( 'created_at', response.created_at );
        self.createMessageView( message );
      });
    },

    createMessageView: function ( message ) {
      var messageView = new bbchatter.MessageView({ model: message });
      messageView.render();
      $( '#messages' ).append( messageView.$el );
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

    resetMessageForm: function () {
      this.messageInput.val('');
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
      this.model.set( 'display_name', $( '#display_name' ).val() );

      if ( this.model.get( 'room_type' ) === 'create') {
        this.model.set( 'room_name', $( '#room_name' ).val() );
        this.createChatroom();
      } else {
        this.model.set( 'room_key', $( '#room_key' ).val() );
        this.joinChatroom();
      }
      this.removeOverlay();
    },

    submitChatterForm: function ( e ) {
      var messageText = this.messageInput.val();

      e.preventDefault();
      e.stopPropagation();

      this.createMessage( messageText );
      this.resetMessageForm();

      return false;
    }

  });
});