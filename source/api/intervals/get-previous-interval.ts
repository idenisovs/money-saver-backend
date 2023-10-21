import { Request, Response } from 'express';
import states from 'http-status';
import log4js from 'log4js';

import { User } from '../../shared';
import bl from '../../bl';

const log = log4js.getLogger('get-previous-interval');

export default async function getPreviousInterval(req: Request, res: Response) {
	const user = req.user as User;
	const intervalId = Number(req.params.id);

	log.debug('User %s requested interval previous to interval <%d>!', user.login, intervalId);

	try {
		const previousInterval = await bl.intervals.getPrevious(intervalId, user);

		if (previousInterval) {
			log.trace(previousInterval);
		} else {
			log.warn('No previous interval found for interval <%d>!', intervalId);
		}

		res.json(previousInterval);
	} catch (err) {
		log.error(err);
		res.status(states.INTERNAL_SERVER_ERROR).json({ err });
	}
}
