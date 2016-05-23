/**
 * Created by I.Denisovs on 16.23.5.
 */

var db = require('./../db');

function getById(id, done)
{
    var user = { id: 1, login: 'user1', password: 'qwerty' };

    done(null, user);
}

module.exports = getById;