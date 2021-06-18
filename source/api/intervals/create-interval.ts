import { Request, Response } from 'express';
import states from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';

const log = log4js.getLogger('create-interval');

export default async function createInterval(req: Request, res: Response) {
	const interval = req.body;

	interval.user = req.user;

	try {
		const result = await bl.intervals.create(interval);
		res.json(result);
	} catch(err) {
		log.error(err);
		res.status(states.INTERNAL_SERVER_ERROR).json(err);
	}
}