import { Router } from 'express';

import validate from './validate-interval';
import createInterval from './create-interval';
import deleteInterval from './delete-interval';
import getIntervalById from './get-interval-by-id';
import getIntervals from './get-intervals';
import getLatestInterval from './get-latest-interval';
import getYears from './get-years';
import updateInterval from './update-interval';
import validateIntervalToFinish from './interval-finish-validate';
import finishInterval from './finish-interval';
import getPreviousInterval from './get-previous-interval';

const intervals = Router();

intervals.get('/', getIntervals);
intervals.post('/', validate, createInterval);
intervals.get('/latest', getLatestInterval);
intervals.get('/years', getYears);
intervals.get('/:id', getIntervalById);
intervals.put('/:id', validate, updateInterval);
intervals.delete('/:id', deleteInterval);
intervals.get('/:id/previous', getPreviousInterval);
intervals.post('/:id/finish', validateIntervalToFinish, finishInterval);

export default intervals;
