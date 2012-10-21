var bbchatter = bbchatter || {};

(function() { 
  'use strict';

  bbchatter.Message = Backbone.Model.extend({
    
    paramRoot: 'message',
    urlRoot: '',

    defaults: {
      display_name: '',
      text: '',
      chatroom_id: '',
      created_at: ''
    },

    initialize: function() {
      console.log('creating new bbchatter.Message');
    },

    headerText: function() {

    },

  });
}());
