const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();

const user = {
    id: 1
};

const db = {
    get: null
};

const deps = {
    '../db': db
};

const modulePath = '../../../../dal/users/get-by-id';

const getByIdTest = proxyquire(modulePath, deps);

describe('DAL.users.getById', () => {
    beforeEach(() => {
        db.get = (sql, props, done) => {
            done(null, user)
        }
    });

    it('Returns User object', () => {
        db.get = (sql, props, done) => {
            assert.equal(props['$id'], 1);
            done(null, user);
        };

        getByIdTest(1, result);

        function result(err, user) {
            assert.equal(user.id, 1);
        }
    });

    it('Returns Error object', () => {
        db.get = (sql, props, done) => {
            done({
                message: 'Error mock message.'
            });
        };

        getByIdTest(1, result);

        function result(err, user) {
            assert.exists(err);
            assert.notExists(user);
        }
    });
});