const db = require('../db');

let sql = 'SELECT count(id) as intervals FROM intervals WHERE userId = $userId';

function getIntervalsCount(userId) {
    return new Promise((resolve, reject) => {
        const params = { $userId: userId };

        db.get(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.intervals);
            }
        });
    })

}

module.exports = getIntervalsCount;
