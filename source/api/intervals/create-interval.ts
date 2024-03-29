import { Request, Response } from 'express';
import states from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { Interval, User } from '../../shared';

const log = log4js.getLogger('create-interval');

export default async function createInterval(req: Request, res: Response) {
	const interval = new Interval(req.body);
	const user = req.user as User;

	try {
		const result = await bl.intervals.create(interval, user);
		res.json(result);
	} catch (err) {
		log.error(err);
		res.status(states.INTERNAL_SERVER_ERROR).json(err);
	}
}
