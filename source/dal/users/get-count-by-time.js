/**
 * Created by I.Denisovs on 15.03.2017.
 */

var db = require('../db');

var sql = "SELECT count(id) AS count FROM users WHERE last >= $timestamp";

function getUsersCountByTime(timestamp, done) {

    var params = { $timestamp: timestamp };

    db.get(sql, params, done);
}

module.exports = getUsersCountByTime;
