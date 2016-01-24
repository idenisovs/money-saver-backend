/**
 * Created by Ga5Xz2 on 31.12.2015..
 */

var db = require('../db');

var sql = 'DELETE FROM payments WHERE id = $id';

function deleteById(id, callback)
{
    var params = { $id: id };

    db.run(sql, params, done);

    function done(err)
    {
        callback(err, this.changes);
    }
}

module.exports = deleteById;