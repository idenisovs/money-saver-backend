/**
 * Created by I.Denisovs on 16.23.5.
 */
const HttpStatus = require('http-status');

function failure(req, res) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Failed to authenticate!' });
}

module.exports = failure;
