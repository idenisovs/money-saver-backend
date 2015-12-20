var Promise = require('promise');
var db = require('./../db');

module.exports = savePayment;

function savePayment(payment)
{
    var resolve, reject;

    return new Promise(resolver);

    function resolver(_resolve, _reject)
    {
        resolve = _resolve;
        reject = _reject;

        db.test();

        setTimeout(done, 10);
    }

    function done(err)
    {
        if (err)
        {
            reject(err);
            return;
        }

        resolve();
    }
}