var express  = require('express'),
    socketIO = require('socket.io'),
    http     = require('http'),
    path     = require('path')


var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use('/web', express.static(path.join(__dirname, '../front')))

io.on('connection', function (socket) {

})

server.listen(41000)
