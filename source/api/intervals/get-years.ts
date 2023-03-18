import { Request, Response } from 'express';
import httpCodes from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { User } from '../../shared';

const log = log4js.getLogger('get-years');

export default async function getAvailableYears(req: Request, res: Response) {
	const user = req.user as User;

	log.debug('Requesting years for user %s!', user.login);

	try {
		const years = await bl.intervals.getYears(user);

		res.json(years);
	} catch (err) {
		res.status(httpCodes.INTERNAL_SERVER_ERROR).json(err);
	}
}
