var bbchatter = bbchatter || {};

(function() {

  bbchatter.Chatroom = Backbone.Model.extend({


      defaults: {
        display_name: '',
        chatroom_name: '',
        chatroom_id: '',
        messages: new bbchatter.MessageCollection()
      },

      postMessage: function(text) {
        var self = this,
            message = new bbchatter.Message();
        message.set('text', text);
        message.set('display_name', self.display_name);
        message.set('chatroom_id', self.chatroom_id);
        self.messages.create(message);
      }

  });

}());
