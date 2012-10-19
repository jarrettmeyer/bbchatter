var bbchatter = bbchatter || {};

bbchatter.Message = Backbone.Model.extend({
	paramRoot: 'message',

	defaults: {
    display_name, '',
		text: '',
    chatroom_id: '',
    created_at: ''
	}

});

bbchatter.MessageCollection = Backbone.Collection.extend({

	model: bbchatter.Message,
	url: '/messages'

});

