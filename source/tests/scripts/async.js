/**
 * Created by Ilya Denisov on 09.10.2016..
 */

var request = require('../integration/request');
var log = require('log4js').getLogger('async');
var moment = require('moment');
var helper = require('../integration/helper');
var host = require('../integration/host.json').host;

log.info('Starting...');

var today = Date.now();

var interval = {
    start: moment(today).subtract(7, 'days').valueOf(),
    end: moment(today).add(7, 'days').valueOf(),
    sum: 123.45
};

helper.login(clear);

function clear() {
    helper.clearIntervals(makeInterval);
}

function makeInterval() {

    var options = {
        url: host.intervals,
        body: interval
    };

    request.post(options, createPayments);
}

function createPayments(err, res) {
    if (err) {
        return log.error(err);
    }

    if (res.statusCode !== 200) {
        return log.error(res.statusCode);
    }

    var payments = [];

    for (var i = 0; i < 200; i++) {
        var payment = {
            sum: Math.floor(random(0, 20) * 100) / 100,
            time: generateTime()
        };

        payments.push(payment);
    }

    var q = [], step = 5;

    for (var i = 0; i < payments.length; i += step) {
        log.debug('Saving all from %d to %d', i, i+step);

        var paymentsToSave = payments.slice(i, i+5);

        q.push(helper.payments.save(paymentsToSave));
    }

    Promise.all(q).then(done);
}

function done() {
    log.info('Done!');
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function generateTime() {
    var days = 14;
    var hours = days * 24;

    var hour = Math.floor(random(0, hours + 1));

    return moment(interval.start).add(hour, 'hours').valueOf();
}



