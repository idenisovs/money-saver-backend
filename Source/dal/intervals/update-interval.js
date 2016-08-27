/**
 * This module updates Interval table with given Interval object.
 * Created by I.Denisovs on 27.08.2016
 */

var db = require('../db');

var sql = 'UPDATE intervals SET sum = $sum WHERE id = $id AND userId = $userId';

function updateInterval(interval, done)
{
    var params = { $id: interval.id, $userId: interval.user.id, $sum: interval.sum };

    db.run(sql, params, done);
}

module.exports = updateInterval;