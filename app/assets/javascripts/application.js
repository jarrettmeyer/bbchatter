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

var app = {};

$(function() {
	'use strict';

	// Variable declarations.
	app.chatroom_id = 0;
	app.createChatroomUrl = '/chatrooms';
	app.createMessageUrl = '/messages';
	app.display_name = '';
	app.fetchIntervalInMS = 3000;
	app.getMessagesUrl = '/messages';
	app.joinChatroomUrl = '/chatrooms/join';
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
				date = new Date(messages[index].created_at);
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
			app.setChatHeader();
      app.beginFetchingMessages();
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
		var url = app.getMessagesUrl + '?chatroom_id=' + app.chatroom_id + '&' + Math.random();
		$.get( url, function ( response ) {
			app.appendMessagesToWindow( response );
		});
	};

	app.formatDate = function ( date ) {
		var day = date.getDate(), 
				month = date.getMonth() + 1, 
				year = date.getFullYear(), 
				hour = date.getHours(), 
				minute = date.getMinutes(),
				seconds = date.getSeconds();
		
		minute = app.padLeadingZero( minute );
		seconds = app.padLeadingZero( seconds );

		return day + '-' + month + '-' + year + ' ' + hour + ':' + minute + ':' + seconds;
	};

	app.joinChatroom = function () {
		var chatroomData = {
			room_key: app.room_key
		};
		$.post( app.joinChatroomUrl, chatroomData, function ( response ) {
			app.chatroom_id = response.id;
			app.room_name = response.room_name;
			app.setChatHeader();
			app.beginFetchingMessages();
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

  // Page bindings.
  $( 'input[name=room_type]' ).click( app.onRoomTypeClicked );
  $( '#chatter-form' ).submit( app.onMessageSubmitted );
  $( '#start-chatting' ).click( app.onStartChattingClicked );
});

