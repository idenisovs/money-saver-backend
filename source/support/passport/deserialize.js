const bl = require('../../bl');

function deserialize(id, done) {
    bl.users.getById(id, success, error);

    function success(user) {
        done(null, clean(user));
    }

    function error(err) {
        done(err);
    }
}

module.exports = deserialize;

function clean(user) {
    const result = Object.assign({}, user);

    delete result.password;

    return result;
}
