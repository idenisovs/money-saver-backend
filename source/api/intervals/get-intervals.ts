import { Request, Response } from 'express';
import states from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';

const log = log4js.getLogger('get-intervals');

export default async function getIntervals(req: Request, res: Response) {
	log.debug('User request arrived!');
	log.trace(req.query);

	try {
		const intervals = await bl.intervals.get(req);

		log.trace(intervals);

		res.json(intervals);
	} catch (e) {
		log.error(e);

		res.status(states.INTERNAL_SERVER_ERROR).json(e);
	}
}
