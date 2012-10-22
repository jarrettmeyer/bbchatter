var bbchatter = bbchatter || {};

$(function () { 
  'use strict';

  bbchatter.MessageView = Backbone.View.extend({

    messageContainer: $( '#chatroom-window' ),

    tagName: 'div',

    // Cache the template for showing a single item.
    template: _.template( $( '#message-template' ).html() ),

    render: function () {
      console.log( 'rendering view' );
      var content = this.template( this.model.toJSON );
      $( this.messageContainer ).append( content );
      return this;
    }

  });
});

