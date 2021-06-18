const db = require('../db').default;

let sql = "";

sql += "SELECT id, login, password, email, timezone, language\n";
sql += "FROM users\n";
sql += "WHERE id = $id";

function getById(id, done)
{
    const params = { $id: id };

    db.get(sql, params, done);
}

module.exports = getById;