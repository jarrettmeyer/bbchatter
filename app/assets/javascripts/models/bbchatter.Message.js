var bbchatter = bbchatter || {};

(function() { 
  'use strict';

  bbchatter.Message = Backbone.Model.extend({
    
    paramRoot: 'message',
    
    defaults: {
      display_name: '',
      text: '',
      chatroom_id: '',
      created_at: ''
    },

    initialize: function() {
    }

  });
}());
