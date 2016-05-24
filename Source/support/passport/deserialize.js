/**
 * Created by I.Denisovs on 16.24.5.
 */

var bl = require('../../bl/bl');

function deserialize(id, done)
{
    bl.users.getById(id, success, error);

    function success(user)
    {
        done(null, user);
    }

    function error(err)
    {
        done(err);
    }
}

module.exports = deserialize;