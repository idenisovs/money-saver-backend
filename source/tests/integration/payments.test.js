/**
 * Created by I. Denisovs on 11.12.2015..
 */
var helper = require('./helper');

describe('Payments REST API', paymentsRestTests);

function paymentsRestTests()
{
    before(helper.login);
    before(helper.createInterval);

    describe('Get Payments', require('./payments/get-payments'));
    describe('Save Payments', require('./payments/save-payments'));
    describe('Delete Payments', require('./payments/delete-payment'));
    describe('Update Payments', require('./payments/update-payments'));

    after(helper.deleteInterval);
    after(helper.logout);
}
