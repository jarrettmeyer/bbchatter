var bbchatter = bbchatter || {};

(function() {

  bbchatter.Chatroom = Backbone.Model.extend({

    isFetchStarted: false,

    url: '/chatrooms',

    timeout: 3 * 1000,  // 3 seconds

    defaults: {
      id: 0,
      display_name: '',
      room_key: '',
      room_name: '',
      room_type: ''
    },

    initialize: function () {
      this.messages = new bbchatter.MessageCollection();
    },

    start: function () {
      if (this.room_type === 'create') {
        this.createChatroom();
      } else {
        this.joinChatroom();
      }
    },

    addMessage: function ( text ) {
      var newMessage = new bbchatter.Message();

      newMessage.set('text', text);
      newMessage.set('display_name', this.get('display_name'));
      newMessage.set('chatroom_id', this.get('id'));

      this.messages.addMessage( newMessage );
    },

    createChatroom: function () {
      var self = this;
      $.post(self.url, { room_name: self.get('room_name') }, function (response) {
        self.set('id', response.id);
        self.set('room_key', response.room_key);
        self.beginFetchingMessages();
      });
    },

    joinChatroom: function () {
      var self = this;
      $.post(self.url + '/join', { room_key: self.get('room_key') }, function (response) {
        if (response && response.id) {
          self.set('id', response.id);
          self.set('room_key', response.room_key);
          self.set('room_name', response.room_name);
          self.beginFetchingMessages();
        }
      });
    },

    beginFetchingMessages: function () {
      var self = this;
      setInterval( self.fetchMessages, self.timeout );
      console.log( 'set interval is started' );
    },

    fetchMessages: function () {
      console.log('fetching...');
    }

  });

}());
