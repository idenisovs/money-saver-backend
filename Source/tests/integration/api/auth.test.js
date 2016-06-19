/**
 * Created by I.Denisovs on 16.19.6.
 */

describe('Authentication tests', authenticationTests);

function authenticationTests()
{
    describe('Login', require('./auth/login'));
    describe('Logout', require('./auth/logout'));
}

