var bbchatter = bbchatter || {};

$(function () { 
  'use strict';

  bbchatter.MessageView = Backbone.View.extend({

    tagName: 'div',
    
    className: 'message',
    
    // Cache the template for showing a single item.
    template: _.template( $( '#message-template' ).html() ),

    initialize: function () {
      this.on( 'model:change', 'render' );
    },

    isMessageOwned: function () {
      return this.model && this.model.get( 'is_owned' );
    },

    render: function () {
      var json = this.model.toJSON();
      this.$el.html( this.template( json ) );
      
      if ( this.isMessageOwned() ) {
        this.$el.addClass( 'owned' );
      }

      return this;
    }

  });
});