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
  var message = new bbchatter.Message();
  equal( message.get('text'), '' );
});

test( 'message should have a default timestamp', function () {
  var message = new bbchatter.Message();
  equal( message.get('timestamp'), '');
});

test( 'is_owned is false by default', function () {
  var message = new bbchatter.Message();
  equal( message.get( 'is_owned'), false );
});

test( 'is_owned can be set in constructor', function () {
  var message = new bbchatter.Message({ is_owned: true });
  equal( message.get( 'is_owned' ), true );
});

test( 'when is_owned is false, optional class is blank', function () {
  var message = new bbchatter.Message({ is_owned: false });
  equal( message.get( 'optional_class' ), '' );
});

test( 'when is_owned is true, optional class is "owned"', function () {
  var message = new bbchatter.Message({ is_owned: true });
  equal( message.get( 'optional_class' ), 'owned' );
});

test( 'timestamp should be based on created_at initial value', function () {  
  var message = new bbchatter.Message({ created_at: 'Mon, 22 Oct 2012 13:38:04 EDT' });
  equal( message.get('timestamp'), '22-Oct-2012 13:38:04', 'Warning! This test is sensitive to the timezone of the browser!');
});

test( 'timestamp should change when created_at changes', function () { 
  // Do the previous test.
  var message = new bbchatter.Message({ created_at: 'Mon, 22 Oct 2012 13:38:04 EDT' });
  equal( message.get('timestamp'), '22-Oct-2012 13:38:04');

  // Now change created_at.
  message.set('created_at', 'Tue, 23 Oct 2012 4:12:56 EDT')
  equal( message.get('timestamp'), '23-Oct-2012 4:12:56');
});


// ----------------------------------------------------------------------------
// Message Collection Tests
module( "Message Collection Tests" );
test( "can create instance of collection", function () {
  var messages = new bbchatter.MessageCollection();
  notEqual( messages, undefined, 'messages should not be undefined' );
  notEqual( messages, null, 'messages should not be null' );
});

test( 'can add a message to the collection', function () {
  var messages = new bbchatter.MessageCollection();
  messages.add( new bbchatter.Message() );
  equal( messages.length, 1 );
});

// ----------------------------------------------------------------------------
// Chatroom Model Tests
module( "Chatroom Model Tests" );
test( 'can create instance of Chatroom', function () {
  var chatroom = new bbchatter.Chatroom();
  notEqual( chatroom, undefined );
  notEqual( chatroom, null );
});

test( 'chatroom has a collection of messages', function () {
  var chatroom = new bbchatter.Chatroom();
  var messages = chatroom.get( 'messages' );
  notEqual( messages, undefined );
  notEqual( messages, null );
});

test( 'chatroom has a default room name', function () {
  var chatroom = new bbchatter.Chatroom();
  equal( chatroom.get( 'room_name' ), '' );
});

test( 'chatroom room name can be set', function () {
  var chatroom = new bbchatter.Chatroom();
  chatroom.set('room_name', 'this is my room');
  equal( chatroom.get('room_name'), 'this is my room' );
});

test( 'chatroom id can be set in constructor', function () {
  var chatroom = new bbchatter.Chatroom({ id: 1 });  
  equal( chatroom.get('id'), 1 );
});

test( 'can build and add a message to a chatroom', function () {
  var chatroom = new bbchatter.Chatroom();
  equal( chatroom.get( 'messages' ).length, 0 );

  var message = chatroom.buildMessage({ text: "hello there!" });
  equal( chatroom.get( 'messages' ).length, 1 );
});

test( 'building a message sets the chatroom id', function () {
  var chatroom = new bbchatter.Chatroom({ id: 3 });
  var message = chatroom.buildMessage({ text: "hello there!" });
  equal( message.get( 'chatroom_id' ), 3 );
});

test( 'building a message sets the display name', function () {
  var chatroom = new bbchatter.Chatroom({ display_name: 'unit tester' });
  var message = chatroom.buildMessage({ text: "hello there!" });
  equal( message.get('display_name'), 'unit tester' );
});

test( 'adding a message adds to message collection', function () { 
  var chatroom = new bbchatter.Chatroom();
  var message = new bbchatter.Message({ id: 20 });
  chatroom.addMessage( message );
  equal( chatroom.get( 'messages' ).length, 1 );
});

test( 'adding a message will not add duplicate message IDs', function () {
  var chatroom = new bbchatter.Chatroom();
  chatroom.addMessage( new bbchatter.Message({ id: 42 }));
  chatroom.addMessage( new bbchatter.Message({ id: 42 }));
  equal( chatroom.get( 'messages' ).length, 1 );
});

test( 'when ID is set after build, adding a message will not duplicate ID', function () {
  var chatroom = new bbchatter.Chatroom();
  var message = chatroom.buildMessage({});
  equal( message.get( 'id' ), 0 );
  equal( chatroom.get( 'messages' ).length, 1);

  // Now set the id (like returning from a POST).
  message.set( 'id', 42 );
  equal( message.get( 'id' ), 42 );

  // Now try to add the message again (like a duplicated GET).
  chatroom.addMessage( new bbchatter.Message({ id: 42 }) );
  equal( chatroom.get( 'messages' ).length, 1);  
});


// ----------------------------------------------------------------------------
// View tests need to wait until the DOM has loaded.
$(function () {

  // --------------------------------------------------------------------------
  // Message View Tests
  module( "Message View Tests" );
  test( 'can create instance of view', function () { 
    var view = new bbchatter.MessageView();
    notEqual( view, undefined );
    notEqual( view, null );
  });

  test( 'can render the template', function () {
    var $fixture = $( '#qunit-fixture' );
    var message = new bbchatter.Message({ text: 'this is a test' });
    var view = new bbchatter.MessageView({ model: message });
    view.render();
    $fixture.append( view.$el );
    equal( $( 'div.message', $fixture ).length, 1 );
  });

  // --------------------------------------------------------------------------
  // Chatroom View Tests
  module( "Chatroom View Tests" );
  test( 'can create instance of view', function () {
    var view = new bbchatter.ChatroomView();
    notEqual( view, undefined );
    notEqual( view, null );
  });

  test( 'contains a collection of messages', function () { 
    var view = new bbchatter.ChatroomView();
    equal( view.messages.length, 0 );
  });

  test( 'model is a chatroom', function () {    
    var view = new bbchatter.ChatroomView({});
    notEqual( view.model, undefined );
    notEqual( view.model, null );
    equal( view.model.get('id'), 0 );
  });

  test( 'can pass in a known chatroom to constructor', function () {
    var chatroom = new bbchatter.Chatroom({ id: 5 });
    var view = new bbchatter.ChatroomView({ model: chatroom });
    equal( view.model.get('id'), 5 );
  });


});


