var bbchatter = bbchatter || {};

(function() { 
  'use strict';

  bbchatter.Message = Backbone.Model.extend({
    
    defaults: {
      chatroom_id: 0,
      created_at: '',
      display_name: '',
      is_owned: false,
      optional_class: '',
      text: '',
      timestamp: ''
    },

    initialize: function( attributes ) {
      this.on( 'change:created_at', this.updateTimestamp );
      this.updateTimestamp();

      this.on( 'change:is_owned', this. updateOptionalClass );
      this.updateOptionalClass();
    },

    updateOptionalClass: function () {
      this.set( 'optional_class', this.get( 'is_owned' ) === true ? 'owned' : '' );
    },

    updateTimestamp: function () {            
      var date = new Date( this.get( 'created_at' ) ),
          newTimestampValue = '',
          year = date.getFullYear(),
          month = this.convertMonthOrdinalToString( date.getMonth() ),
          day = date.getDate(),
          hours = date.getHours(),
          minutes = date.getMinutes(),
          seconds = date.getSeconds();

      if ( !this.get( 'created_at' ) ) {
        // Do not continue if we don't have a value. It won't end well.
        return;
      }          
      
      minutes = this.padDateOrdinalWithLeadingZero( minutes );
      seconds = this.padDateOrdinalWithLeadingZero( seconds );

      newTimestampValue = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
      this.set({ timestamp: newTimestampValue });
    },

    padDateOrdinalWithLeadingZero: function ( value ) {
      if (value < 10) {
        value = '0' + value;
      }
      return value;
    },

    convertMonthOrdinalToString: function ( value ) {
      var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
      return months[value];
    }

  });
}());


