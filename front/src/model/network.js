define(function (require) {
	var Queue = require('valaxy/linear-list/queue')

	var pic = {
		time      : new Date,
		charLength: 0
	}

	var Network = function () {
		this._queue = new Queue
		this._num = 0
		this._lastPic = null
	}

	Network.prototype._remove = function () {
		this._queue.dequeue()
		this._num -= 1
	}

	Network.prototype.add = function (data) {
		var pic = this._lastPic = {
			time      : new Date,
			charLength: data.length
		}

		// 移除一分钟之外的
		var queue = this._queue
		queue.inqueue(pic)
		this._num += 1


		while (true) {
			if (pic.time.getTime() - queue.peek().time.getTime() > 60000) {
				this._remove()
			} else {
				break
			}
		}

		//console.log(this.getPicNumPerSecond())
	}

	Network.prototype.getPicNumPerSecond = function () {
		return this._num * 1000 / (this._lastPic.time.getTime() - this._queue.peek().time.getTime())
	}

	var network = new Network()
	return network
})