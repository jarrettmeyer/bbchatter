var ChatRoom = Backbone.Model.extend({

    initialize: function() {
        this.messages = new MessageCollection();
        this.messages.url = '/chatroom/' + this.room_key + '/messages';
    }

});