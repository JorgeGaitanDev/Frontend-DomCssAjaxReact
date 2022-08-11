  // var whiteboard = window.whiteboard; //whiteboard.js debemos traerlo
  var whiteboard = require("./whiteboard");
  var oi = require("socket.io-client");
  var socket = window.io(window.location.origin); //socket.io-client debemos traerlo

  socket.on('connect', function () {
    console.log('Connected!');
  });

  socket.on('load', function (strokes) {

    strokes.forEach(function (stroke) {
      var start = stroke.start;
      var end = stroke.end;
      var color = stroke.color;
      whiteboard.draw(start, end, color, false);
    });

  });

  socket.on('draw', function (start, end, color) {
    whiteboard.draw(start, end, color, false);
  });

  whiteboard.on('draw', function (start, end, color) {
    socket.emit('draw', start, end, color);
  });

