var adb = require('adbkit').createClient()

adb.listDevices().then(function (devices) {
	return devices[0].id
}).then(function (deviceId) {
	return adb.screencap(deviceId)
}).then(function (stream) {
	var buffer = new Buffer(0)

	stream.on('data', function (data) {
		buffer = Buffer.concat([buffer, data])
	})

	stream.on('end', function () {
		console.log(buffer.toString('base64').length)
	})
})