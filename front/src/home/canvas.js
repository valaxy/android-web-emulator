define(function (require) {
	var WIDTH = 600
	var network = require('../model/network')
	var moment = require('moment')


	var canvas = {
		init: function (options) {
			this.radio = undefined
			this.canvas = options.canvas
			this.ctx = this.canvas.getContext("2d")
			this.io = options.io
			this.cursor = undefined // 当前指针的位置

			this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
			this.canvas.addEventListener('click', this.onClick.bind(this))
			this.canvas.addEventListener('contextmenu', this.onContextmenu.bind(this))
		},

		onMouseMove: function (e) {
			this.cursor = {
				x: e.offsetX,
				y: e.offsetY
			}
		},

		onClick: function (e) {
			this.io.emit('tap', {
				x: e.offsetX / this.radio,
				y: e.offsetY / this.radio
			})
		},

		onContextmenu: function (e) {
			this.io.emit('longtap', {
				x: e.offsetX,
				y: e.offsetY
			})
			e.preventDefault()
		},

		setSize: function (device) {
			this.width = WIDTH
			this.radio = this.width / device.width
			this.height = device.height * this.radio

			this.canvas.setAttribute('width', this.width)
			this.canvas.setAttribute('height', this.height)
		},

		drawFrame: function (base64, cb) {
			var me = this
			var image = new Image()
			image.onload = function () {
				me.ctx.drawImage(image, 0, 0, me.width, me.height)
			}
			var dataUrl = "data:image/png;base64," + base64
			image.src = dataUrl

			console.log('[%s] receive: %s MB, length: %s', moment().format('mm:ss:SSSS'), base64.length * 4 / 1024 / 1024, base64.length)

			network.add(base64)
			cb && cb()
		}
	}


	return canvas

})