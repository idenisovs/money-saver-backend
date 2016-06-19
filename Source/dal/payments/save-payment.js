var util = require('util');
var Promise = require('promise');
var log = require('log4js').getLogger('save-payment');
var db = require('./../db');
var getByTime = require('../intervals/get-by-time');

var sql = "INSERT INTO payments (time, date, sum, userId) VALUES ($time, $date, $sum, $userId)";

function savePayment(payment, userId)
{
	var resolve, reject; 

    var params = { $time: payment.time, $date: payment.date, $sum: payment.sum, $userId: userId };

	log.debug('Saving payment with sum: %s and user id %s', payment.sum, userId);
	log.trace(payment);

	return new Promise(resolver);
	
	function resolver(_resolve, _reject)
	{
		resolve = _resolve;
		reject = _reject;

		getByTime(payment.time, userId, checkInterval);
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