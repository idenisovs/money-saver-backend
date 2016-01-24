/**
 * Created by Ga5Xz2 on 26.12.2015..
 */

var db = require('../db');

module.exports = deleteInterval;

var sql = 'DELETE FROM intervals WHERE id = $id';

function deleteInterval(id, callback)
{
    var params = { $id: id };

    db.run(sql, params, done);

    function done(err)
    {
        callback.lastID = this.changes > 0 ? this.lastID : null;

        callback(err);
    }
}