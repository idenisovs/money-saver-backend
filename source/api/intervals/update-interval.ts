import { Request, Response } from 'express';
import http from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { Interval, User } from '../../shared';

const log = log4js.getLogger('update-interval');

export default async function updateInterval(req: Request, res: Response) {
	const interval = new Interval(req.body);
	const user = req.user as User;

	try {
		log.info('User <%d> requested to update interval <%d>!', user.id, interval.id);

		const result = await bl.intervals.update(interval, user);

		res.json(result);
	} catch (err) {
		log.error(err);

		res.status(http.INTERNAL_SERVER_ERROR).json(err);
	}
}
