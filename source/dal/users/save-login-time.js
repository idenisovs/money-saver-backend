const db = require('../db').default;

const sql = 'UPDATE users SET last = strftime("%s") * 1000 WHERE id = $userId';

function saveLoginTime(user, done) {
    const params = { $userId: user.id };

    db.run(sql, params, done);
}

module.exports = saveLoginTime;