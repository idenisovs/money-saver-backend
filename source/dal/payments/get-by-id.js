const db = require('./../db');

let sql = "";

sql += "SELECT id, date, time, sum\n";
sql += "FROM payments\n";
sql += "WHERE id = $id\n";
sql += "AND userId = $userId\n";

function getById(payment, callback) {
    const params = { '$id': payment.id, '$userId': payment.user.id };

    db.get(sql, params, callback);
}

module.exports = getById;