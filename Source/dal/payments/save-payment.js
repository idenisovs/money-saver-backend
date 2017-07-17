const deferred = require('deferred');
const util = require('util');
const log = require('../../support/logger')();
const db = require('./../db');
const getIntervalByTime = require('../intervals/get-by-time');

const sql = "INSERT INTO payments (time, date, sum, userId) VALUES ($time, $date, $sum, $userId)";

function savePayment(payment)
{
	const q = deferred();

	log.debug('Saving payment with sum: %s and user id %s', payment.sum, payment.user.id);
	log.trace(JSON.stringify(payment));

	const params = { $time: payment.time, $date: payment.date, $sum: payment.sum, $userId: payment.user.id };
    const interval = { time: payment.time, user: payment.user };

    getIntervalByTime(interval, checkInterval);

	return q.promise;

	function checkInterval(err, interval)
	{
		if (err) {
			return reject(err);
		}

		if (interval) {
            return db.run(sql, params, done);
		}

        let message = '';
        message += 'Given payment does not belong to any of intervals!\n';
        message += 'Please, set the correct value to Time field!';
        delete payment.user;
        q.reject({ message: message, payment: payment });
	}
	
	function done(err) {
		if (err) {
			return q.reject(err);
		}
		
		q.resolve();
	}
}

module.exports = savePayment;