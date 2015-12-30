var Promise = require('promise');
var db = require('./../db');

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