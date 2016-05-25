/**
 * Created by I.Denisovs on 15.12.2015..
 */
/**
 * This module returns the latest interval.
 * Created by I.Denisovs on 17.11.2015..
 */
var db = require('./../db');

module.exports = getIntervalById;

var sql = 'SELECT id, start, end, sum FROM intervals WHERE id = $id AND userId = $userId';

function getIntervalById(id, userId, callback)
{
    var params = { $id: id, $userId: userId };

    db.get(sql, params, callback);
}