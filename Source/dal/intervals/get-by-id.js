/**
 * This module returns the latest interval.
 * Created by I.Denisovs on 17.11.2015..
 */
var db = require('./../db');

module.exports = getIntervalById;

var sql = 'SELECT id, start, end, sum, latest FROM intervals WHERE id = $id AND userId = $userId';

function getIntervalById(interval, callback)
{
    var params = { $id: interval.id, $userId: interval.user.id };

    db.get(sql, params, callback);
}