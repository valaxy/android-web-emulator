var adb    = require('./adb'),
    util   = require('util'),
    logger = require('./log')


exports.sendevent = function (code, value) {
	var command = util.format('sendevent /dev/input/event1 1 %s %s', code, value)

	return adb.listDevices().then(function (devices) {
		return devices[0].id
	}).then(function (id) {
		return adb.shell(id, command)
	}).then(function () {
		logger.info(command)
	})
}