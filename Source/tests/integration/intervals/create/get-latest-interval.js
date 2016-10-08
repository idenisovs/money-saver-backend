/**
 * Created by Ilya Denisov on 08.10.2016..
 */

var request = require('../../request');
var endpoint = require('./../../host.json').host.intervals;

function getLatestInterval(done) {

    var options = { url: endpoint + '/latest', json: true };

    request(options, function(err, res, body) {
        done(body);
    });

}

module.exports = getLatestInterval;