var bbchatter = bbchatter || {};

(function() {

  bbchatter.Chatroom = Backbone.Model.extend({

    defaults: {
      display_name: '',
      id: 0,
      messages: null,
      room_key: '',
      room_name: '',
      room_type: 'create'    
    },

    initialize: function () {
      // If the message collection has not been created, then set
      // a new instance.
      if ( !this.get( 'messages' )) {
        this.set( 'messages', new bbchatter.MessageCollection() );
      }
    },

    // Add message will add a new message to the collection as long the
    // ID doesn't already exist in the message collection.
    addMessage: function ( message ) {
      var messageId = message.get( 'id' ),
          matchingIds = this.get( 'messages' ).where({ id: messageId });
          returnValue = false;

      if ( !matchingIds.length ) {
        this.get( 'messages' ).add( message );
        returnValue = true;
      }

      return returnValue;
    },

    // Build message functions similarly to the Rails association
    // build() method.
    buildMessage: function( messageProperties ) {
      var message = new bbchatter.Message( messageProperties );
      message.set( 'chatroom_id', this.get( 'id' ) );
      message.set( 'display_name', this.get( 'display_name') );
      this.get( 'messages' ).add( message );
      return message;
    }

  });
}());