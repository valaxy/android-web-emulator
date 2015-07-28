var express    = require('express'),
    socketIO   = require('socket.io'),
    http       = require('http'),
    path       = require('path'),
    screencast = require('./lib/screencast'),
    adb        = require('./lib/adb'),
    util       = require('util')


var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use('/web', express.static(path.join(__dirname, '../front')))


var people = 0
var MAX_PEOPLE = 3

io.on('connection', function (socket) {
	if (people >= MAX_PEOPLE) {
		console.log('max people, can not connect, current: %s', people)
		socket.close()
		return
	}

	people++
	console.log('connect, current people: %s', people)

	if (people == 1) {
		screencast.start()
		console.log('start screencast')
	}

	socket.on('disconnect', function () {
		people--
		console.log('disconnect, current people: %s', people)

		if (people == 0) {
			screencast.stop()
			console.log('stop screencast')
		}
	})

	socket.on('tap', function (data) {
		console.log('tap %j', data)
		adb.listDevices().then(function (devices) {
			return devices[0].id
		}).then(function (id) {
			var command = util.format('input tap %s %s', data.x, data.y)
			adb.shell(id, command).then(function () {
				console.log(command)
			})
		})
	})
})


screencast.on('data', function (data) {
	io.emit('data', data)
})


server.listen(41000)
