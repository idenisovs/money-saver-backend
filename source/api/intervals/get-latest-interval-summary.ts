import { Request, Response } from 'express';
import statusCodes from 'http-status';
import log4js from 'log4js';

import bl from '../../bl';
import { User } from '../../shared';

const log = log4js.getLogger('intervals');

export default async function getLatestIntervalSummary(req: Request, res: Response) {
	log.debug('User requested latest interval summary!');

	try {
		const summary = await bl.intervals.getLatestSummary(req.user as User);

		log.debug('Got summary!');
		log.trace(summary);

		if (summary) {
			res.json(summary);
		} else {
			res.status(statusCodes.NO_CONTENT).json(null);
		}
	} catch (err) {
		log.error(err);
		res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ err: err });
	}
}
