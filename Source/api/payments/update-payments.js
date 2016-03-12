/**
 * Created by Ilya Denisov on 12.03.2016..
 */

var log = require('log4js').getLogger('update-payments');
var http = require('http-status');
var bl = require('../../bl/bl');


function updatePayments(req, res)
{
    log.info('API called!');

    log.info(req.body);

    setTimeout(function(){
        res.json({ message: 'Hello, world!' });
    }, 3000);
}

module.exports = updatePayments;