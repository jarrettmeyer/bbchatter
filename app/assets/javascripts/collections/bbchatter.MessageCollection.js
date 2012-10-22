var bbchatter = bbchatter || {};

bbchatter.MessageCollection = Backbone.Collection.extend({

    model: bbchatter.Message,

    url: '/messages',

    el: '#chatroom-window',

    addMessage: function ( message ) {
    	var self = this, newMessage, newView, i;
    	$.post(this.url, message.toJSON(), function (response) {
    		for (i = 0; i < response.length; i++) {
  				self.add( response[i] );
  				newView = new bbchatter.MessageView({ model: response[i] });
  				newView.render();
    		};
    	});
    }

});