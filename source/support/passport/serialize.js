/**
 * Created by I.Denisovs on 16.24.5.
 */

function serialize(user, done)
{
    done(null, user.id);
}

module.exports = serialize;