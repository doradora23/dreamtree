var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var BlockSchema= mongoose.Schema({uid:String, msg:String, room:String});
var TestModel = mongoose.model("TestModel", BlockSchema);

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
 
var httpServer =http.createServer(app).listen(8080, function(req,res){
  console.log('Socket IO server has been started');
});

// upgrade http server to socket.io server
var io = require('socket.io').listen(httpServer);

io.sockets.on('connection',function(socket){
  socket.on('init',function(data){ // init이 실행될 때
    TestModel.find(function(err, models){
      if(err) 
        return console.error(err);
      else{
        for(var val of models) {
          if(val.room == data.room) // db의 모든 데이터와 클라이언트의 방을 비교함
            socket.emit('toclient',val); // 해당 클라이언트에게 전달
      }
        
      }
    });
  })
  
  
  socket.on('fromclient',function(data){
  socket.broadcast.emit('toclient',data); // 자신을 제외하고 다른 클라이언트에게 보냄
  socket.emit('toclient',data); // 해당 클라이언트에게만 보냄
  var testIns = new TestModel({ uid: data.uid, msg: data.msg, room : data.room });
  testIns.save(function(err){
    if (err)
      return console.log(err);
     }) 
  })
});

mongoose.connect('mongodb://dreamtree:dreamtreepw@ds135594.mlab.com:35594/cocoding');
mongoose.connection.on('error', console.log);

module.exports = app;

