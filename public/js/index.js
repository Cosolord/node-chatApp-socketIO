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
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});
// 
// socket.emit("createMessage", {
//   from: "Frank",
//   text: "Ciao Frank!"
// }, function(data){
//   console.log("Ricevuto", data);
// });

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text:jQuery('[name=message]').val()
  }, function(){

  });
});
