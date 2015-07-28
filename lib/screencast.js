var adb          = require('./adb'),
    async        = require('async'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    _            = require('underscore'),
    screencap    = require('./screencap')

// adb.screencap

var screencast = {}
var isStart = false
_.extend(screencast, EventEmitter.prototype)


async.forever(
	function (next) {
		if (isStart) {
			//setTimeout(function () {
			//	next()
			//}, 500)

			screencap(function (err, data) {
				if (!err) {
					screencast.emit('data', data)
				} else {
					console.error(err)
				}

				setTimeout(function () {
					next()
				}, 0)
			})
		} else {
			next()
		}
	},
	function () {
		throw new Error('never end here')
	}
)


screencast.start = function () {
	isStart = true
}


screencast.stop = function () {
	isStart = false
}

module.exports = screencast
