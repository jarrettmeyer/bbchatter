var bbchatter = bbchatter || {};

bbchatter.Message = Backbone.Model.extend({
	paramRoot: 'message',

	defaults: {
		text: null
	}

});

bbchatter.MessageCollection = Backbone.Collection.extend({

	model: bbchatter.Message,
	url: '/messages'

});

