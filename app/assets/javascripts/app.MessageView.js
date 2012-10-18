var MessageView = Backbone.View.extend({
    tagName: 'message',
    className: 'message-container',
    template: _.template($('#message-template').html()),
    render: function () {            
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});
