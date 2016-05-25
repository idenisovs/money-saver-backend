/**
 * Created by I.Denisovs on 16.25.5.
 */

var helper = require('./helper/helper');

describe('Smoke test', smokeTestRestApi);

function smokeTestRestApi()
{
    before(initAll);

    describe('REST API', require('./smoke/rest'));

    after(clearAll);
}

function initAll(done)
{
    helper.createInterval(function(){
        helper.createPayments(done);
    });
}

function clearAll(done) {
    helper.deletePayments(function() {
        helper.deleteInterval(done);
    });
}

