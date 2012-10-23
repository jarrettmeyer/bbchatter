var bbchatter = bbchatter || {};

(function() {

  bbchatter.Chatroom = Backbone.Model.extend({

    defaults: {
      display_name: '',
      id: 0,
      messages: new bbchatter.MessageCollection(),
      message_ids: [],
      room_key: '',
      room_name: ''    
    },

    addMessage: function ( messageProperties ) {
      var message = new bbchatter.Message( messageProperties );
      message.set( 'chatroom_id', this.get( 'id' ) );
      message.set( 'display_name', this.get( 'display_name') );
      this.get( 'messages' ).add( message );
      return message;
    },

    addMessageId: function ( messageId ) {
      var returnValue = false;
      if ( messageId && !this.containsMessageId( messageId ) ) {
        this.get( 'message_ids' ).push( messageId );
        returnValue = true;
      }
      return returnValue;
    },

    containsMessageId: function ( messageId ) {
      var index, 
          count = this.get( 'message_ids' ).length,
          returnValue = false;
      for ( index = 0; index < count; index += 1 ) {
        if ( this.get( 'message_ids' )[index] === messageId ) {
          returnValue = true;
          break;
        }
      }
      return returnValue;
    },

    reset: function () {      
      this.get( 'messages' ).reset();
      this.messageCount = this.get( 'messages' ).length;
    }

  });
}());