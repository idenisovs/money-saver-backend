const db = require('../db').default;

let sql = 'SELECT count(id) as intervals FROM intervals WHERE userId = $userId';

export function getIntervalsCount(userId: number): Promise<number> {
    return new Promise((resolve, reject) => {
        const params = {
            $userId: userId
        };

        db.get(sql, params, (err: Error, result: { intervals: number }) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.intervals);
            }
        });
    })

}