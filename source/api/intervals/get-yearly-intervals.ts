import { Request, Response } from 'express';
import log4js from 'log4js';

import bl from '../../bl';
import { User } from '../../shared';

const log = log4js.getLogger('intervals');

export default async function getYearlyIntervals(req: Request, res: Response) {
	const year = req.params.year;
	const user = req.user as User;

	log.info('User requested getYearlyIntervals for year %s!', year);

	res.json(await bl.intervals.getYearlyIntervals(year, user));
}