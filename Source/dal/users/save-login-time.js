/**
 * Created by I.Denisovs on 14.03.2017.
 */

var db = require('./../db');

var sql = 'UPDATE users SET last = strftime("%s") * 1000 WHERE id = $userId';

function saveLoginTime(user, done)
{
    var params = { $userId: user.id };

    db.run(sql, params, done);
}

module.exports = saveLoginTime;