import { Request, Response } from 'express';
import statusCode from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { User } from '../../shared';

const log = log4js.getLogger('expenses-summary');

export default async function getExpensesSummary(req: Request, res: Response) {
	const user = req.user as User;

	log.debug('User <%s> requested Expenses Summary!');

	const intervalId = req.params.interval_id ? Number(req.params.interval_id) : null;

	try {
		const summary = await bl.summary.expenses(intervalId, user);

		log.trace(summary);

		res.json(summary);
	} catch (e) {
		log.error(e);

		const msg = (e as Error).message;

		if (msg === 'Interval not found!') {
			res.status(statusCode.NOT_FOUND);
		} else {
			res.status(statusCode.INTERNAL_SERVER_ERROR);
		}

		res.json(e);
	}
}
