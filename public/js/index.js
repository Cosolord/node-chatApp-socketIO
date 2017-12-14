var socket = io();
socket.on("connect", function() {
  console.log("Connected to server");
});
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message){
  console.log("New message", message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} (${message.createdAt}): ${message.text}`);
  jQuery('#messages').append(li);
});
//
// socket.emit("createMessage", {
//   from: "Frank",
//   text: "Ciao Frank!"
// }, function(data){
//   console.log("Ricevuto", data);
// });

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from} (${message.createdAt}): `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});
var messageTextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'Natman',
    text:messageTextbox.val()
  }, function(){
    messageTextbox.val("");
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    locationButton.removeAttr('disabled').text('Send location');
  }, function(){
    locationButton.attr('disabled', 'disabled').text('Geolocation disabled');
    alert("Unable to fetch location");
  });
});
