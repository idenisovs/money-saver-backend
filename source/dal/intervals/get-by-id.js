const db = require('../db').default;

module.exports = getIntervalById;

const sql = 'SELECT id, start, end, sum, latest FROM intervals WHERE id = $id AND userId = $userId';

function getIntervalById(interval, callback) {
    const params = { $id: interval.id, $userId: interval.user.id };

    db.get(sql, params, callback);
}