var adb    = require('./adb'),
    logger = require('./log')

var getDevice = adb.listDevices().then(function (devices) {
	return devices[0].id
})


module.exports = function (cb) {
	getDevice.then(function (deviceId) {
		//logger.profile('adb screencap')
		return adb.screencap(deviceId)
	}).then(function (stream) {
		var buffer = new Buffer(0)

		stream.on('data', function (buf) {
			buffer = Buffer.concat([buffer, buf])
		})

		stream.on('end', function () {
			//console.log('before ', buffer.length)
			var base64 = buffer.toString('base64')
			//console.log('after  ', base64.length)
			//logger.profile('adb screencap')

			cb(null, base64)

		})
	})
}
