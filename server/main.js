var express=require('express');
var app=express();
var server=require('http').Server(app);
var io= require("socket.io")(server);

var messages=[{
    id:1,
    text:"Bienvenido al chat",
    author:"Sala#1"
}]
app.use(express.static('public'));
app.get('/',function(req,res){
 res.status(200).send("Hola");

})
io.on('connection',function(socket){
    console.log('alguien se ha conectado');
    socket.emit('messages', messages);
    socket.on('new-messages', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
})

server.listen(3000,function(){
    console.log("server corriendo en el portal 3000")
})