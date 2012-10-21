var bbchatter = bbchatter || {};

bbchatter.MessageCollection = Backbone.Collection.extend({

    model: bbchatter.Message,

    url: '/messages',

    addMessage: function ( message ) {
    	var self = this;
    	console.log( 'posting to URL: ' + this.url );
    	messageAsJson = message.toJSON();
    	console.log( 'message: ' + messageAsJson );
    	$.post(this.url, message.toJSON(), function (response) {
    		self.push( new bbchatter.Message( response.message ) );
    	});
    },

    setRoomKey: function ( room_key ) {
    	//this.url = '/chatroom/' + room_key + '/messages';
    }

});