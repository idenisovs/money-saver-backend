/**
 * Created by I.Denisovs on 05.12.2016
 */
var helper = require('./helper');

describe('Properties REST API', paymentsRestTests);

function paymentsRestTests()
{
    before(helper.login);

    describe('Update', require('./properties/update-properties'));
    describe('Password validation', require('./properties/password-validation'));

    after(helper.logout);
}