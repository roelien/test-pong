var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 8080
var io = require("socket.io").listen(app.listen(port));


app.get('/', function(req, res){

  //send the index.html file for all requests
  res.sendFile(__dirname + '/index.html');

});

console.log('listening on *:'+ port);

var ballArr=[
    {
    x:100,
    y:100,
    r: 10,
    stepX:5,
    stepY:5,  
    },
];


function moveBall(ball){
    ball.x += ball.stepX;
    ball.y += ball.stepY;

    if(ball.x == 470 || ball.x == 30){
        ball.stepX = -ball.stepX;
    }
    if (ball.y == 30 || ball.y == 270){
        ball.stepY = -ball.stepY;
    }

    return ball;
}

setInterval( function() {
    
    for(var i=0;i<ballArr.length; i++) {
        var thisBall=ballArr[i];
        moveBall(thisBall);
    }
    
    io.sockets.emit('canvas', ballArr);
    console.log (ballArr);
}, 40);

