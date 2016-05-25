/**
 * Created by I.Denisovs on 31.12.2015..
 */

var db = require('../db');

var sql = 'DELETE FROM payments WHERE id = $id AND userId = $userId';

function deleteById(id, userId, callback)
{
    var params = { $id: id, $userId: userId };

    db.run(sql, params, done);

    function done(err)
    {
        callback(err, this.changes);
    }
}

module.exports = deleteById;