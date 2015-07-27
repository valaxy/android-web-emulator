var adb   = require('../adb'),
    async = require('async')


module.exports = function () {

	async.timesSeries(10, function (n, next) {
		adb.screencap(function () {
			setTimeout(function () {
				next()
			}, 1000)
		})
	}, function () {
		console.log('over')
	})

	
}

