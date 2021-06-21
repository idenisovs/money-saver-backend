const moment = require('moment');
const log = require('log4js').getLogger('get-payments');
const dal = require('../../dal').default;

module.exports = getPayments;

function getPayments(request, success, error) {
    log.trace(request.user);

    let interval;

    if ('id' in request) {
        log.debug('Taking payment by Id!');
        dal.payments.getById(request, done);
        return;
    }

    if ('date' in request) {
        log.debug('Taking payments by date!');
        dal.payments.getByDate(request, done);
        return;
    }

    if (('from' in request) && ('till' in request)) {
        log.debug('Taking payments by date range!');
        const from = moment(request.from).startOf('day').valueOf();
        const till = moment(request.till).endOf('day').valueOf();
        interval = { from: from, till: till, user: request.user };
        dal.payments.getByDateRange(interval, done);
        return;
    }

    log.debug('Taking payments by latest interval!');
    interval = { user: request.user };
    dal.intervals.getLatest(interval, getLatestDone);

    function getLatestDone(err, latestInterval) {
        if (err) {
            return error(err);
        }

        latestInterval.user = request.user;

        log.debug('Latest interval taken!');
        log.trace(latestInterval);

        dal.payments.getByIntervalId(latestInterval, done);
    }

    function done(err, payments) {
        if (err) {
            return error(err);
        }

        success(payments);
    }
}
