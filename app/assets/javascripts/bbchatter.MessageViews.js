var bbchatter = bbchatter || {};

bbchatter.NewMessageView = Backbone.View.extend({

  template: JST["backbone/templates/messages/new"],

  render: function() {
    return this;
  },

  save: function(e) {
    e.preventDefault();
    e.stopPropagation();

    var self = this;

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

//class bbchatter.Views.Messages.NewView extends Backbone.View
//  template: JST["backbone/templates/messages/new"]

//  events:
//    "submit #new-message": "save"

//  constructor: (options) ->
//    super(options)
//    @model = new @collection.model()

//    @model.bind("change:errors", () =>
//      this.render()
//    )

//  save: (e) ->
//    e.preventDefault()
//    e.stopPropagation()

//    @model.unset("errors")

//    @collection.create(@model.toJSON(),
//      success: (message) =>
//        @model = message
//        window.location.hash = "/#{@model.id}"

//      error: (message, jqXHR) =>
//        @model.set({errors: $.parseJSON(jqXHR.responseText)})
//    )

//  render: ->
//    $(@el).html(@template(@model.toJSON() ))

//    this.$("form").backboneLink(@model)

//    return this