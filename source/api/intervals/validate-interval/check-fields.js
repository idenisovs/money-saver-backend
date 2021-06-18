/**
 * This module checks fields of Interval object.
 * Created by I. Denisovs on 19.07.2017..
 */

const util = require('util');
const moment = require('moment');
const log = require('../../../support/log4js');

function checkFields(interval) {
    if (util.isUndefined(interval)) {
        throw new Error('Interval object is not set!');
    }

    if (isUndefined(interval.end)) {
        throw new Error('End date is not set! Please, set `end` field properly!');
    }

    if (isUndefined(interval.sum)) {
        throw new Error('Sum is not set! Please, set `sum` field properly!');
    }

    if (isUndefined(interval.start)) {
        return log.warn('interval.start is undefined!');
    }

    const delta = moment(interval.end).diff(interval.start, 'days', true);

    if (delta < 1) {
        throw new Error('Interval between Start and End dates is smaller than 1 day.');
    }
}

module.exports = checkFields;

function isUndefined(value) {
    return (util.isUndefined(value) || value === null);
}