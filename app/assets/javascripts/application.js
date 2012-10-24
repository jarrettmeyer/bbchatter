// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require underscore-min
//= require backbone-min
//= require ./models/bbchatter.Message.js
//= require ./collections/bbchatter.MessageCollection.js
//= require ./models/bbchatter.Chatroom.js
//= require ./views/bbchatter.MessageView.js
//= require ./views/bbchatter.ChatroomView.js

var app = {};

$(function() {
	'use strict';

	// Variable declarations.
	app.chatroom_id = 0;
	app.createChatroomUrl = '';
	app.createMessageUrl = '/messages';
	app.display_name = '';
	app.fetchIntervalInMS = 3000;
	app.getMessagesUrl = '/messages';
	app.joinChatroomUrl = '/chatrooms/join';
	app.knownIds = [];
	app.room_key = '';
	app.room_name = '';
	app.room_type = 'create';

	app.appendMessagesToWindow = function ( messages ) {
		if (messages && messages.length) {
			var content, 
					count = messages.length,
					date,
					index;

			for ( index = 0; index < count; index += 1 ) {
				if ( app.isKnownId( messages[index].id ) ) {
					// This is an ID that we are already tracking. Do not add it to
					// the page a second time.
					continue;
				} 
				
				// Not a known ID so add it to the list of known IDs.
				app.knownIds.push( messages[index].id );
				
				date = new Date( messages[index].created_at );
				content = '<div class="message"><div class="message-header">';
				content += messages[index].display_name + ' [' + app.formatDate( date ) + ']';
				content += '</div><div class="message-body">';
				content += messages[index].text;
				content += '</div></div>';
				$( '#chatroom-window' ).append( content );
			}
		}
	};

	app.beginFetchingMessages = function () {
		window.setInterval( app.fetchNewMessages, app.fetchIntervalInMS );
	};

	app.createChatroom = function () {
		$.post(app.createChatroomUrl, { room_name: app.room_name }, function ( response ) {
			app.chatroom_id = response.id;
			app.room_key = response.room_key;
			app.initializeChatroomAfterLoad();
    });
	};

	app.createMessageJSON = function () {
		return {
			text: $( '#message-text' ).val(),
			display_name: app.display_name,
			chatroom_id: app.chatroom_id
		}
	};

	app.fetchNewMessages = function () {
		var url = app.getMessagesUrl + '?' + Math.random();
		$.get( url, function ( response ) {
			app.appendMessagesToWindow( response );
		});
	};

	app.formatDate = function ( date ) {
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				day = date.getDate(), 
				month = date.getMonth(), 
				year = date.getFullYear(), 
				hours = date.getHours(), 
				minutes = date.getMinutes(),
				seconds = date.getSeconds();
		
		month = months[ month ];
		minutes = app.padLeadingZero( minutes );
		seconds = app.padLeadingZero( seconds );

		return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
	};

	app.initializeChatroomAfterLoad = function () {
		app.setChatHeader();
		app.setCreateMessageUrl();
		app.setGetMessagesUrl();
		app.beginFetchingMessages();
	},

	app.isKnownId = function ( id ) {
		var index, returnValue = false;
		for ( index = 0; index < app.knownIds.length; index += 1 ) {
			if ( id === app.knownIds[index] ) {
				returnValue = true;
				break;
			}
		}
		return returnValue;
	};

	app.joinChatroom = function () {
		var chatroomData = {
			room_key: app.room_key
		};
		$.post( app.joinChatroomUrl, chatroomData, function ( response ) {
			app.chatroom_id = response.id;
			app.room_name = response.room_name;
			app.initializeChatroomAfterLoad();
		});
	};

	app.onMessageSubmitted = function( e ) {
		var messageData;

		e.preventDefault();
		e.stopPropagation();

		messageData = app.createMessageJSON();
		app.postMessageToServer( messageData );
		app.resetMessageForm();
		
		return false;
	};

	app.onRoomTypeClicked = function () {
    var value = $( 'input[name=room_type]:checked' ).val();
    if ( value === 'create' ) {
      app.room_type = 'create';
      $( '#room_key_fields' ).slideUp();
      $( '#room_name_fields' ).slideDown();
    } else {
      app.room_type = 'join';
      $( '#room_name_fields' ).slideUp();
      $( '#room_key_fields' ).slideDown();
    }
  };

  app.onStartChattingClicked = function () {
  	app.display_name = $( '#display_name' ).val();

  	if (app.room_type === 'create') {
  		app.room_name = $( '#room_name' ).val();
  		app.createChatroom();
  	} else {
  		app.room_key = $( '#room_key' ).val();
  		app.joinChatroom();
  	}
  	app.removeOverlay();
  };

  app.padLeadingZero = function ( value ) {
  	if (value < 10) {
  		value = '0' + value;
  	}
  	return value;
  };

  app.postMessageToServer = function ( messageData ) {
  	$.post(app.createMessageUrl, messageData, function ( response ) {
			app.appendMessagesToWindow( response );
		});
  };

  app.removeOverlay = function () {
  	$( '#overlay' ).hide();
  };

  app.resetMessageForm = function () {
		$( '#message-text' ).val('');
	};

	app.setChatHeader = function () {
		$( '#chatroom-name' ).html( app.room_name );
		$( '#chatroom-key' ).html( app.room_key )
	};

	app.setCreateMessageUrl = function () {
		app.createMessageUrl = '/chatrooms/' + app.room_key + '/messages';
		//console.log( 'url: ' + app.createMessageUrl );
	};

	app.setGetMessagesUrl = function () {
		app.getMessagesUrl = '/chatrooms/' + app.room_key + '/messages';
	};

  // Page bindings.
  $( 'input[name=room_type]' ).click( app.onRoomTypeClicked );
  $( '#chatter-form' ).submit( app.onMessageSubmitted );
  $( '#start-chatting' ).click( app.onStartChattingClicked );
});

