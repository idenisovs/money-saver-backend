/**
 * This module returns the latest interval.
 * Created by Ga5Xz2 on 17.11.2015..
 */
var db = require('./../db');

module.exports = getLatest;

var sql = 'SELECT id, start, end, sum FROM intervals ORDER BY id DESC LIMIT 1';

function getLatest(callback)
{
    db.get(sql, callback);
}