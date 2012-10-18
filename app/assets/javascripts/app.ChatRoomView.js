var ChatRoomView = Backbone.View.extend({

    initialize: function () {
        this.model = new ChatRoom();
        this.render();
    },

    render: function () {
        var self = this;
        _.each(this.collection.models, function (item) {
            self.renderMessage(item);                
        }, this);
        return this;
    },

    renderMessage: function (item) {
        var messageView = new MessageView({ model: item });
        this.$el.append(messageView.render().el);
    }
});
