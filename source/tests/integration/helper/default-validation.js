/**
 * Created by Ilya Denisov on 09.10.2016..
 */

var assert = require('chai').assert;

function defaultValidation(done, skipBody)
{
    function validate(err, res, body) {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        if (done && !skipBody) {
            return done(body);
        }

        if (done && skipBody) {
            return done();
        }
    }

    return validate;
}

module.exports = defaultValidation;