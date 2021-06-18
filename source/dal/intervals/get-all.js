/**
 * Created by Ilya Denisov on 09.07.2016..
 */

var db = require('../db').default;

var sql = 'SELECT id, start, end, sum, latest FROM intervals WHERE userId = $userId ORDER BY start DESC';

function getAllIntervals(user, callback)
{
    var params = { '$userId': user.id };

    db.all(sql, params, callback);
}

module.exports = getAllIntervals;