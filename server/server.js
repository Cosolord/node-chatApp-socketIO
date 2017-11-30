const path     = require('path'),
      http     = require('http'),
      express  = require('express'),
      hbs      = require('handlebars'),
      socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on("connection", function(socket){
  console.log("New user connected");
  socket.on("disconnect", function(){
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server started at port: ${port} at time: ${Date.now()}`);
});
