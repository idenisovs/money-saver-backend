const dal = require('../../dal');
const calculateSchedule = require('../summary/calc/calculate-schedule');
const calculatePrediction = require('../summary/calc/calculate-prediction');
const calculateTotals = require('../summary/calc/calculate-totals');

module.exports = function getLatestIntervalSummary(user, success, error) {
    const result = {
        interval: null,
        spendings: null,
        schedule: null,
        totals: null
    };

    const interval = {user: user};

    dal.intervals.getLatest(interval, latestInterval);

    async function latestInterval(err, interval) {
        if (err) {
            return error(err);
        }

        if (!interval) {
            return success(null);
        }

        result.interval = interval;

        interval.user = user;

        dal.intervals.getCount(user.id).then((count) => {
            interval.single = count === 1;
            dal.payments.getDailySpendings(interval, dailySpendings);
        }).catch((err) => {
            return error(err);
        });
    }

    function dailySpendings(err, dailySpendings) {
        if (err) {
            error(err);
            return;
        }

        result.spendings = dailySpendings;

        calculate();
    }

    function calculate()
    {
        result.schedule = calculateSchedule(result);

        calculatePrediction(result);

        result.totals = calculateTotals(result);

        success(result);
    }
}
