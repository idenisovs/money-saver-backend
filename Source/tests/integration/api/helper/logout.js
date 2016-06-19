/**
 * Created by I.Denisovs on 16.19.6.
 */

var request = require('request').defaults({ json: true });
var host = require('../host.json').host;

function logout()
{
    var options =
    {
        url: host.auth + '/logout'
    };

    request.get(options, done);
}

module.exports = logout;