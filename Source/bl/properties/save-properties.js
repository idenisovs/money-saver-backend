/**
 * Created by I.Denisovs on 04.12.2016
 */

var log = require('log4js').getLogger('properties');

function saveProperties(request, success, error) {
    log.trace(request);
    setTimeout(success, 1000);
}

module.exports = saveProperties;