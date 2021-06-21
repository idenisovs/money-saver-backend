import { Request } from 'express';
import deleteByInterval from './by-interval';
import deleteById from './by-id';
import deleteByIntervalId from './by-interval-id';

const NO_VALID_DATA_MESSAGE = 'No valid data specified! Payments table is not affected!';

export function deletePayments(req: Request): Promise<number> {
	if (req.query.from && req.query.till) {
		return deleteByInterval(req);
	}

	if (req.query.id) {
		return deleteById(req);
	}

	if (req.query.intervalId) {
		return deleteByIntervalId(req);
	}

	throw new Error(NO_VALID_DATA_MESSAGE);
}