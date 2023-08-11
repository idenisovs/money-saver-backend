import { Request, Response } from 'express';
import log4js from 'log4js';

import { Interval, User } from '../../shared';

const log = log4js.getLogger('intervals');

export default async function finishInterval(req: Request, res: Response) {
	log.info('Arrived request to finish interval!');

	const interval = new Interval(req.body);
	const user = req.user as User;

	res.json({
		message: 'ok'
	});
}