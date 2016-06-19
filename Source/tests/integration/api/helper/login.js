/**
 * Created by I.Denisovs on 16.19.6.
 */

var request = require('request').defaults({ json: true });
var host = require('../host.json').host;

function login(done)
{
    var user =
    {
        login: 'user1',
        password: 'test1'
    };

    var options =
    {
        url: host.auth,
        body: user
    };

    request.post(options, done);
}

module.exports = login;