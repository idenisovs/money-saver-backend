/**
 * Created by Ilya Denisov on 23.09.2016..
 */

var util = require('util');
var moment = require('moment');
var log = require('log4js').getLogger('interval-validity');

function checkValidity(interval)
{
    var result = null;

    try
    {
        checkFields(interval);
    }
    catch (err)
    {
        result = { reason: 'param', message: err.toString() };

        log.error('Interval has invalid fields! %s', result.message);
    }

    log.debug('New interval is valid!');

    return result;
}

module.exports = checkValidity;

