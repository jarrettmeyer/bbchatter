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

    validate: function () { 
      //validateText();
    },

    validateText: function () {
      var value = attribute.text,
          isValid = value && value.length && /\w/.test(value)
      if (!isValid) {

      }
    }

  });
}());
