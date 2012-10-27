var bbchatter = bbchatter || {};

$(function () { 
  'use strict';

  bbchatter.MessageView = Backbone.View.extend({

    tagName: 'div',
    
    className: 'message',
    
    // Cache the template for showing a single item.
    template: _.template( $( '#message-template' ).html() ),

    initialize: function () {
      this.on( 'change', 'render' );
    },

    render: function () {
      console.log( 'render message: ' + this.model.get( 'id' ) );
      var json = this.model.toJSON();
      this.$el.html( this.template( json ) );
      return this;
    }

  });
});