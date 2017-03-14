/**
 * This endpoint should return the number of active users;
 *
 * Created by I.Denisovs on 14.03.2017.
 */

var status = require('http-status');
var bl = require('../../bl');

function getActiveUsersCount(req, res) {

    bl.users.getActiveCount(success, error);

    function success(activeUsersCount) {
        res.json({ active: activeUsersCount });
    }

    function error(err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = getActiveUsersCount;