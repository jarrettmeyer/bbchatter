var bbchatter = bbchatter || {};
(function() {

  bbchatter.ChatRoom = Backbone.Model.extend({

      defaults: {
        display_name: '',
        chatroom_name: '',
        chatroom_id, '',
        messages: new bbchatter.MessageCollection()
      },

      postMessage: function(message) {
        var self = this;
        message.set('display_name', self.display_name);
        message.set('chatroom_id', self.chatroom_id);
        self.messages.create({})
      }

  });

});