define(function (require) {
	var io = require('socket.io')
	var socket = io()

	var canvas = document.querySelector('.emulator')
	var ctx = canvas.getContext("2d")

	socket.on('data', function (data) {
		var image = new Image()
		image.onload = function () {
			ctx.drawImage(image, 0, 0, 800, 1280)
		}
		var dataUrl = "data:image/png;base64," + data
		image.src = dataUrl
		console.log('receive: ', data.length)
	})


})