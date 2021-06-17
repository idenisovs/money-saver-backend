/**
 * This module updates Interval table with given Interval object.
 * Created by I.Denisovs on 27.08.2016
 */
const db = require('../db');

const log = require('log4js').getLogger('intervals');

const sql = `UPDATE intervals 
SET 
    sum = $sum,
    start = $start,
    end = $end 
WHERE 
    id = $id 
    AND userId = $userId`;

function updateInterval(interval, done) {
    log.debug('Updating interval record in database!');

    const params = {
        $id: interval.id,
        $userId: interval.user.id,
        $sum: interval.sum,
        $start: interval.start,
        $end: interval.end
    };

    db.run(sql, params, done);
}

module.exports = updateInterval;
