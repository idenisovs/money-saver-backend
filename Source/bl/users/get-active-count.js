/**
 * This function calculates the number of active users.
 *
 * Created by I.Denisovs on 14.03.2017.
 */

var moment = require('moment');

var dal = require('../../dal');

function getActiveUsersCount(success, error) {

    var last31days = moment().subtract(31, 'days').valueOf();

    dal.users.getCountByTime(last31days, done);

    function done(err, result) {

        if (err) {
            return err;
        }

        success(result);
    }

}

module.exports = getActiveUsersCount;