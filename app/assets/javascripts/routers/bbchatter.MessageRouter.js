var bbchatter = bbchatter || {};

(function(){
  'use strict';

  bbchatter.MessageRouter = Backbone.Router.extend({

    initialize: function (options) {
      var self = this;
      self.messages = new bbchatter.MessageCollection();
      self.messages.reset(options.messages);
    },

    routes: {
      "new": "newMessage",
      "index": "index",
      ":id/edit" : "edit",
      ":id": "show",
      ".*": "index"
    },

    index: function() {
      var self = this;
      self.view = new bbchatter.NewMessageView({ collection: self.messages });
      $("#messages").html(self.view.render().el);
    }

  });


});



//  newMessage: ->
//    @view = new bbchatter.Views.Messages.NewView(collection: @messages)
//    $("#messages").html(@view.render().el)

//  show: (id) ->
//    message = @messages.get(id)

//    @view = new bbchatter.Views.Messages.ShowView(model: message)
//    $("#messages").html(@view.render().el)

//  edit: (id) ->
//    message = @messages.get(id)

//    @view = new bbchatter.Views.Messages.EditView(model: message)
//    $("#messages").html(@view.render().el)
