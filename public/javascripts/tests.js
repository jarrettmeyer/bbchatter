test( "initial test", function () {
  ok( 1 == '1', 'QUnit is working' );
});


// ----------------------------------------------------------------------------
// Message Model Tests
module( "Message Model Tests" );
test( "can create instance of message model", function () {
  var message = new bbchatter.Message();
  notEqual( message, undefined, "message should not be undefined" );
  notEqual( message, null, "message should not be null" );  
});

test( 'message should have a default text value', function () {
  message = new bbchatter.Message();
  equal( message.get('text'), '' );
});

test( 'message should have a default timestamp', function () {
  message = new bbchatter.Message();
  equal( message.get('timestamp'), '');
});

test( 'is_owned is false by default', function () {
  message = new bbchatter.Message();
  equal( message.get( 'is_owned'), false );
});

test( 'is_owned can be set in constructor', function () {
  message = new bbchatter.Message({ is_owned: true });
  equal( message.get( 'is_owned' ), true );
});

test( 'when is_owned is false, optional class is blank', function () {
  message = new bbchatter.Message({ is_owned: false });
  equal( message.get( 'optional_class' ), '' );
});

test( 'when is_owned is false, optional class is "owned"', function () {
  message = new bbchatter.Message({ is_owned: true });
  equal( message.get( 'optional_class' ), 'owned' );
});

test( 'timestamp should be based on created_at initial value', function () {  
  message = new bbchatter.Message({ created_at: 'Mon, 22 Oct 2012 13:38:04 EDT' });
  equal( message.get('timestamp'), '22-Oct-2012 13:38:04', 'Warning! This test is sensitive to the timezone of the browser!');
});

test( 'timestamp should change when created_at changes', function () { 
  // Do the previous test.
  message = new bbchatter.Message({ created_at: 'Mon, 22 Oct 2012 13:38:04 EDT' });
  equal( message.get('timestamp'), '22-Oct-2012 13:38:04');

  // Now change created_at.
  message.set('created_at', 'Tue, 23 Oct 2012 4:12:56 EDT')
  equal( message.get('timestamp'), '23-Oct-2012 4:12:56');
});


// ----------------------------------------------------------------------------
// Message Collection Tests
module( "Message Collection Tests" );
test( "can create instance of collection", function () {
  messages = new bbchatter.MessageCollection();
  notEqual( messages, undefined, 'messages should not be undefined' );
  notEqual( messages, null, 'messages should not be null' );
});

test( 'can add a message to the collection', function () {
  messages = new bbchatter.MessageCollection();
  messages.add( new bbchatter.Message() );
  equal( messages.length, 1 );
});

// ----------------------------------------------------------------------------
// Chatroom Model Tests
module( "Chatroom Model Tests" );
test( 'can create instance of Chatroom', function () {
  chatroom = new bbchatter.Chatroom();
  notEqual( chatroom, undefined );
  notEqual( chatroom, null );
});

test( 'chatroom has a collection of messages', function () {
  chatroom = new bbchatter.Chatroom();
  messages = chatroom.get('messages');
  equal( messages.length, 0 );
  chatroom = undefined;
  messages = undefined;
});

test( 'chatroom has a default room name', function () {
  chatroom = new bbchatter.Chatroom();
  equal( chatroom.get( 'room_name' ), '' );
});

test( 'chatroom room name can be set', function () {
  chatroom = new bbchatter.Chatroom();
  chatroom.set('room_name', 'this is my room');
  equal( chatroom.get('room_name'), 'this is my room' );
});

test( 'chatroom id can be set in constructor', function () {
  chatroom = new bbchatter.Chatroom({ id: 1 });  
  equal( chatroom.get('id'), 1 );
});

test( 'can add a message to a chatroom', function () {
  chatroom = new bbchatter.Chatroom({ id: 2 });
  message = chatroom.addMessage({ text: "hello there!" });
  equal( chatroom.get('messages').length, 1 );
  chatroom = undefined;
  message = undefined;
});

test( 'adding a message sets the chatroom id', function () {
  chatroom = new bbchatter.Chatroom({ id: 3 });
  message = chatroom.addMessage({ text: "hello there!" });
  equal( message.get( 'chatroom_id' ), 3 );
});

test( 'adding a message sets the display name', function () {
  chatroom = new bbchatter.Chatroom({ id: 3, display_name: 'unit tester' });
  message = chatroom.addMessage({ text: "hello there!" });
  equal( message.get('display_name'), 'unit tester' );
});

test( 'can add message ids', function () {
  var chatroom = new bbchatter.Chatroom();
  chatroom.addMessageId( 10 );
  equal( chatroom.get('message_ids').length, 1 );
  equal( chatroom.get('message_ids')[0], 10 );
});

test( 'does not add the same message id twice', function () {
  var chatroom = new bbchatter.Chatroom();
  chatroom.addMessageId( 10 );
  chatroom.addMessageId( 10 );
  equal( chatroom.get('message_ids').length, 1 );
  equal( chatroom.get('message_ids')[0], 10 );
});

// ----------------------------------------------------------------------------
// View tests need to wait until the DOM has loaded.
$(function () {

  // --------------------------------------------------------------------------
  // Message View Tests
  module( "Message View Tests" );
  test( 'can create instance of view', function () { 
    view = new bbchatter.MessageView();
    notEqual( view, undefined );
    notEqual( view, null );
  });

  test( 'can render the template', function () {
    $fixture = $( '#qunit-fixture' );
    message = new bbchatter.Message({ text: 'this is a test' });
    view = new bbchatter.MessageView({ model: message });
    view.container = $fixture;
    view.render();    
    equal( $( 'li.message', $fixture ).length, 1 );
  });

  // --------------------------------------------------------------------------
  // Chatroom View Tests
  module( "Chatroom View Tests" );
  test( 'can create instance of view', function () {
    view = new bbchatter.ChatroomView();
    notEqual( view, undefined );
    notEqual( view, null );
  });

  test( 'contains a collection of messages', function () { 
    view = new bbchatter.ChatroomView();
    equal( view.messages.length, 0 );
  });

  test( 'model is a chatroom', function () {    
    view = new bbchatter.ChatroomView({});
    notEqual( view.model, undefined );
    notEqual( view.model, null );
    equal( view.model.get('id'), 0 );
  });

  test( 'can pass in a known chatroom to constructor', function () {
    chatroom = new bbchatter.Chatroom({ id: 5 });
    view = new bbchatter.ChatroomView({ model: chatroom });
    equal( view.model.get('id'), 5 );
  });


});


