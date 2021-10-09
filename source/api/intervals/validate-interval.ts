import status from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { NextFunction, Request, Response } from 'express';
import { Interval } from '../../shared';

const log = log4js.getLogger('validate-interval');

export default function validateInterval(req: Request, res: Response, next: NextFunction) {
	const interval = new Interval(req.body);

	log.debug('Checking interval: %j', interval);

	try {
		bl.intervals.validate(interval)

		next();
	} catch (err) {
		log.error(err);

		res.status(status.EXPECTATION_FAILED).json({
			message: (err as Error).toString()
		});
	}
}