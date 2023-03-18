import moment from 'moment';
import { Interval } from '../../shared';
import IntervalValidationError from '../../support/errors/interval-validation-error';

export function validateInterval(interval: Interval) {
	if (!interval) {
		throw new IntervalValidationError('Interval object undefined!');
	}

	if (!interval.end) {
		throw new IntervalValidationError('End date is not set! Please, set `end` field properly!');
	}

	if (!interval.sum) {
		throw new IntervalValidationError('Sum is not set! Please, set `sum` field properly!');
	}

	if (!interval.start) {
		throw new IntervalValidationError('Start date is not set! Please, set `start` field properly!');
	}

	const delta = moment(interval.end).diff(interval.start, 'days', true);

	if (delta < 1) {
		throw new IntervalValidationError('Interval between Start and End dates is smaller than 1 day!');
	}
}
