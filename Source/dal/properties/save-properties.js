/**
 * Created by I.Denisovs on 04.12.2016
 */

var db = require('../db');

var sql = 'UPDATE users SET password = $hash, email = $email, timezone = $timezone WHERE id = $id';

function saveProperties(request, done) {

    var params = {
        $hash: request.properties.hash,
        $email: request.properties.email,
        $timezone: request.properties.timezone.timeZoneId
    };

    db.run(sql, params, done);
}

module.exports = saveProperties;