import { Router } from 'express';
import log4js from 'log4js';

import validate from './validate-interval';
import getIntervals from './get-intervals';
import createInterval from './create-interval';
import getLatestIntervalSummary from './get-latest-interval-summary';

const intervals = Router();

intervals.get('/', getIntervals);
intervals.post('/', validate, createInterval);
intervals.get('/latest', require('./get-latest-interval'));
intervals.get('/latest/summary', getLatestIntervalSummary);
intervals.get('/years', require('./get-years'));
intervals.get('/:id', require('./get-interval-by-id'));
intervals.put('/:id', validate, require('./update-interval'));
intervals.delete('/:id', require('./delete-interval'));
intervals.get('/:id/payments', require('./get-payments-by-interval'));

export default intervals;

log4js.getLogger('api').debug('Intervals module is up!');