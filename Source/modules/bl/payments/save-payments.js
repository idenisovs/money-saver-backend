/**
 * Created by Ga5Xz2 on 28.12.2015..
 */

var Promise = require('promise');

module.exports = savePayments;

function savePayments(payments)
{
    var resolve, reject;

    return new Promise(resolver);

    function resolver(_resolve, _reject)
    {
        resolve = _resolve;
        reject = _reject;

        setTimeout(done, 3000);
    }

    function done()
    {
        resolve();
    }
}