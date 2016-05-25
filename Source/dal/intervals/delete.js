/**
 * Created by I.Denisovs on 26.12.2015..
 */

var db = require('../db');

module.exports = deleteInterval;

var sql = 'DELETE FROM intervals WHERE id = $id AND userId = $userId';

function deleteInterval(id, userId, callback)
{
    var params = { $id: id, $userId: userId };

    db.run(sql, params, done);

    function done(err)
    {
        callback.lastID = this.changes > 0 ? this.lastID : null;

        callback(err);
    }
}