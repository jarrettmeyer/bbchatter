var bbchatter = bbchatter || {};

$(function () { 
  'use strict';

  bbchatter.MessageView = Backbone.View.extend({

    tagName: 'li',
    
    className: 'message',
    
    container: $( '#messages' ),

    // Cache the template for showing a single item.
    template: _.template( $( '#message-template' ).html() ),

    render: function () {
      var content = this.template( this.model.toJSON() );
      this.container.append( content );
      return this;
    }

  });
});