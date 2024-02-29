import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import log4js from 'log4js';

import { Interval, User } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('intervals');

export default async function intervalFinishValidate(req: Request, res: Response, next: NextFunction) {
	const user = req.user as User;
	const interval2finish = new Interval(req.body);
	const intervalId = Number(req.params.id);

	log.debug('Validating interval %d to finish!', intervalId);

	if (!interval2finish.id) {
		log.warn('Interval validation failed due to missing interval Id!');
		log.trace(interval2finish);

		return res.status(httpStatus.EXPECTATION_FAILED).json({
			message: 'MISSING_ID',
		});
	}

	const existingInterval = await dal.intervals.getById(interval2finish.id, user);

	if (!existingInterval) {
		log.warn('There is no interval <%d> assigned to user <%d>!', interval2finish.id, user.id);

		return res.status(httpStatus.NOT_FOUND).json({
			message: 'MISSING_ID',
		});
	}

	if (!existingInterval.latest) {
		log.warn('User <%d> tried to finish already finished interval <%d>!', user.id, interval2finish.id);

		return res.status(httpStatus.EXPECTATION_FAILED).json({
			message: 'MISSING_ID',
		});
	}

	return next();
}
