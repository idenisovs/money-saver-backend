/**
 * Created by I.Denisovs on 16.17.5.
 */

var bl = require('../../bl/bl');

function authenticate(req, res)
{
    bl.auth.authenticate({ login: 'Vasja' }, function(){
        res.json({ ok: true });
    });
}

module.exports = authenticate;