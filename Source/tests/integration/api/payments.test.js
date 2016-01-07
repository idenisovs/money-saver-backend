/**
 * Created by Ga5Xz2 on 11.12.2015..
 */
var helper = require('./helper/helper');

describe('Payments REST API', paymentsRestTests);

function paymentsRestTests()
{
    before(helper.createInterval);

    describe('Get Payments', require('./payments/get-payments'));
    describe('Save Payments', require('./payments/save-payments'));
    describe('Delete Payments', require('./payments/delete-payment'));

    after(helper.deleteInterval);
}
