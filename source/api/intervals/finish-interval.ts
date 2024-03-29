import { Request, Response } from 'express';
import log4js from 'log4js';

import { Interval, User } from '../../shared';
import bl from '../../bl';

const log = log4js.getLogger('intervals');

export default async function finishInterval(req: Request, res: Response): Promise<void> {
	const user = req.user as User;
	const interval = new Interval(req.body);

	log.info('User <%d> requested to finish interval <%d>!', user.id, interval.id);

	interval.latest = false;

	await bl.intervals.finish(interval, user);

	res.send();
}