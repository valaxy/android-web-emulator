var childProcess = require('child_process'),
    util         = require('util'),
    path         = require('path'),
    fs           = require('fs'),
    moment       = require('moment')

const FILE_NAME = 'test-screenshot.png'
const REMOTE_FILE_PATH = '/sdcard/' + FILE_NAME
const LOCAL_FILE_PATH = path.join(__dirname, 'runtime', FILE_NAME)


/** 截图 */
exports.screencap = function (cb) {
	childProcess.exec(util.format('adb shell screencap %s', REMOTE_FILE_PATH), function (err) {
		if (err) {
			return cb(err)
		}

		childProcess.exec(util.format('adb pull %s %s', REMOTE_FILE_PATH, LOCAL_FILE_PATH), function (err) {
			fs.readFile(LOCAL_FILE_PATH, function (err, data) {
				if (err) {
					return cb(err)
				}

				data = data.toString('base64')
				console.log(moment().format('mm:ss:SSSS'), 'screencast: ', data.length)

				cb(null, data)
			})
		})
	})
}


module.exports = require('adbkit').createClient()
