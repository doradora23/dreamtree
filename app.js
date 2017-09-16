/**
 * Module dependencies.
 */
 
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose   = require('mongoose');

var BlockSchema= mongoose.Schema({blockcontent:String});
var TestModel = mongoose.model("TestModel", BlockSchema);

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
 
var httpServer =http.createServer(app).listen(8080, function(req,res){
  console.log('Socket IO server has been started');
});
// upgrade http server to socket.io server
var io = require('socket.io').listen(httpServer);
 
io.sockets.on('connection',function(socket){
   socket.on('fromclient',function(data){
       socket.broadcast.emit('toclient',data); // 자신을 제외하고 다른 클라이언트에게 보냄
       socket.emit('toclient',data); // 해당 클라이언트에게만 보냄. 다른 클라이언트에 보낼려면?
       console.log('Message from client :'+data.msg);
       var testIns = new TestModel({ uid: data.uid, blockcontent: data.msg });
       console.log('Message to DB:'+data.msg);
       testIns.save(function(err){
         if (err)
         return console.log(err);
       })
       
      
   })
});

mongoose.connect('mongodb://dreamtree:dreamtreepw@ds135594.mlab.com:35594/cocoding');
mongoose.connection.on('error', console.log);

module.exports = app;

