var bbchatter = bbchatter || {};

(function () { 
  'use strict';

  bbchatter.MessageView = Backbone.View.extend({

    tagName: 'div',

    // Cache the template for showing a single item.
    template: _.template( $('#message-template').html() );

  });
});

bbchatterMessageView = Backbone.View.extend({

  template: JST["backbone/templates/messages/new"],

  events: {
    "submit #new-message": "save"
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  save: function(e) {
    var self = this;
    e.preventDefault();
    e.stopPropagation();

    self.model.unset('errors');

    self.collection.create(self.model.toJSON(), {
      success: function(message) {
        self.model = message;
        window.location.hash = "/#" + self.model.id;
      },
      error: function(message, jqXHR) {
        self.model.set({ errors: $.parseJSON(jqXHR.responseText) });
      }
    });
  }

});



//  constructor: (options) ->
//    super(options)
//    @model = new @collection.model()

//    @model.bind("change:errors", () =>
//      this.render()
//    )

