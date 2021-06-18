import { Router } from 'express';
import validate from './validate-interval';
import log4js from 'log4js';

const intervals = Router();

intervals.get('/', require('./get-intervals'));
intervals.post('/', validate, require('./create-interval'));
intervals.get('/latest', require('./get-latest-interval'));
intervals.get('/latest/summary', require('./get-latest-interval-summary'));
intervals.get('/years', require('./get-years'));
intervals.get('/:id', require('./get-interval-by-id'));
intervals.put('/:id', validate, require('./update-interval'));
intervals.delete('/:id', require('./delete-interval'));
intervals.get('/:id/payments', require('./get-payments-by-interval'));

export default intervals;

log4js.getLogger('api').debug('Intervals module is up!');