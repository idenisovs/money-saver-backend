/**
 * Created by I.Denisovs on 16.19.6.
 */


var request = require('request');

var jar = request.jar();

request = request.defaults({ json: true, jar: jar, followAllRedirects: true });

request.clearCookies = clearCookies();

module.exports = request;

function clearCookies()
{
    jar = request.jar();
}
