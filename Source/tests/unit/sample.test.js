const assert = require('chai').assert;

describe('sample tests', () => {
    it('test 1', () => {
        assert.equal(true, true);
    });

    it('test 2', () => {
        assert.equal(2, 2);
    });

    it('async test', (done) => {
        setTimeout(() => {
            assert.equal('a', 'a');
            done();
        }, 500);
    })
});