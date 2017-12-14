const path = require('path'),
  http = require('http'),
  express = require('express'),
  hbs = require('handlebars'),
  socketIO = require('socket.io'),
  moment = require('moment'),
  {generateMessage, generateLocationMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on("connection", function(socket) {
  console.log("New user connected");

  socket.emit("newMessage", generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit("newMessage", generateMessage('Admin', 'New user joined'));

  socket.on("createMessage", function(message, callback) {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on("createLocationMessage", function(coords){
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on("disconnect", function() {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log('Server avviato: oggi è ' + moment().locale('it').format('dddd') + ' ' + moment().locale('it').format('DD MMMM YYYY') + ' e sono le ore ' + moment().format('h:mm:ss a'));
});
