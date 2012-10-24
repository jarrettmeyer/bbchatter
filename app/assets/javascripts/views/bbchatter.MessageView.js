var bbchatter = bbchatter || {};

$(function () { 
  'use strict';

  bbchatter.MessageView = Backbone.View.extend({

    tagName: 'div',
    
    className: 'message',
    
    container: $( '#messages' ),

    // Cache the template for showing a single item.
    template: _.template( $( '#message-template' ).html() ),

    render: function () {
      var content = this.template( this.model.toJSON() );
      console.log( 'content: ' + content );
      console.log( 'container: ' + this.container.html() );
      this.container.append( content );
      console.log( 'rendered message: ' + this.model.get( 'text' ) );
      return this;
    }

  });
});