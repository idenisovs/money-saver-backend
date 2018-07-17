const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();

const user = {
    id: 1,
    name: 'abc'
};

const db = {
    get: null
};

const deps = {
    '../db': db
};

const modulePath = '../../../../dal/users/get-by-name';

const getByNameTest = proxyquire(modulePath, deps);

describe('DAL.users.getByName', () => {
    beforeEach(() => {
        db.get = (sql, props, done) => {
            done(null, user)
        }
    });

    it('Returns User object', () => {
        db.get = (sql, props, done) => {
            assert.equal(props['$username'], 'abc');
            done(null, user);
        };

        getByNameTest('abc', result);

        function result(err, user) {
            assert.equal(user.id, 1);
        }
    });
});
