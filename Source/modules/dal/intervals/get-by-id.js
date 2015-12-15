/**
 * Created by Ga5Xz2 on 15.12.2015..
 */
/**
 * This module returns the latest interval.
 * Created by Ga5Xz2 on 17.11.2015..
 */
var db = require('./../db');

module.exports = getIntervalById;

function getIntervalById(id, callback)
{
    var sql = 'SELECT id, start, end, sum FROM intervals WHERE id = $id';

    var params = { $id: id };

    db.get(sql, params, callback);
}