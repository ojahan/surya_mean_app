var express = require('express');
var router = express.Router();

//socket
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3001);

io.on('connection',function(socket){
    socket.emit('news', { hello:'world' });
    socket.on('test',function(data){
        console.log(data);
    });
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
