/**
 * Created by Ilya Denisov on 09.10.2016..
 */

var request = require('../../request');
var host = require('../../host.json').host;

function savePayments(payments) {

    var resolve, reject;

    return new Promise(resolver);

    function resolver(res, rej) {
        resolve = res;
        reject = rej;

        var options = { url: host.payments, body: payments };

        request.post(options, saveDone);
    }

    function saveDone(err, res) {
        if (err) {
            return reject(err);
        }

        if (res.statusCode !== 200) {
            return reject(res);
        }

        resolve();
    }
}

module.exports = savePayments;