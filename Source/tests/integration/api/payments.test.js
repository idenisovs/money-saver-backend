/**
 * Created by Ga5Xz2 on 11.12.2015..
 */
var util = require('util');
var request = require('request').defaults({ json: true });
var assert = require('chai').assert;
var host = require('./host.json').host;
var helper = require('./helper/helper');

describe('Payments REST API', paymentsRestTests);

function paymentsRestTests()
{
    before(helper.createInterval);

    before(helper.createPayments);

    describe('Get Payments', require('./payments/get-payments'));

    after(helper.deleteInterval);
}
