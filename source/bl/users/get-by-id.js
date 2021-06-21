const dal = require('../../dal').default;

function getUserById(id, success, error) {
    dal.users.getById(id, done);

    function done(err, user) {
        if (err) {
            return error(err);
        }

        success(user);
    }
}

module.exports = getUserById;