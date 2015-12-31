var util = require('util');
var Promise = require('promise');
var db = require('./../db');
var getByTime = require('../intervals/get-by-time');

var sql = "INSERT INTO payments (time, date, sum) VALUES ($time, $date, $sum)";

function savePayment(payment)
{
	var resolve, reject; 

    var params = { $time: payment.time, $date: payment.date, $sum: payment.sum };
	
	return new Promise(resolver);
	
	function resolver(_resolve, _reject)
	{
		resolve = _resolve;
		reject = _reject;

		getByTime(payment.time, checkInterval);
	}

	function checkInterval(err, interval)
	{
		if (err)
		{
			reject(err);
			return;
		}

		if (util.isUndefined(interval))
		{
			var message = '';
			message += 'Given payment does not belong to any of intervals!\n';
			message += 'Please, set the correct value to Time field!';
			reject({ message: message, payment: payment });
			return;
		}

		db.run(sql, params, done);
	}
	
	function done(err)
	{
		if (err)
		{
			reject(err);
			return;
		}
		
		resolve();
	}
}

module.exports = savePayment;