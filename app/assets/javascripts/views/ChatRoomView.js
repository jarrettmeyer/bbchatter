app = app || {};

(function () {

    var app.ChatRoomView = Backbone.View.extend({

        initialize: function () {
            this.collection = new ChatRoom();
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

} (jQuery));