/**
 * Created by I.Denisovs on 16.23.5.
 */

var dal = require('../../dal/dal');

function getUserById(id, success, error)
{
    dal.users.getById(id, done);

    function done(err, user)
    {
        if (err)
        {
            return error(err);
        }

        success(user);
    }
}

module.exports = getUserById;