define(function (require) {
	var io = require('socket.io')
	var socket = io()
	var emulator = require('./canvas')

	emulator.init({
		canvas: document.querySelector('.emulator'),
		io    : socket
	})

	emulator.setSize({
		width : 800,
		height: 1280
	})


	socket.on('data', function (data) {
		emulator.drawFrame(data)
	})


})