import { Request, Response } from 'express';
import log4js from 'log4js';

import bl from '../../bl';
import { IntervalSummary, User } from '../../shared';

const log = log4js.getLogger('intervals');

export default async function getYearlyIntervals(req: Request, res: Response) {
	const year = req.params.year;
	const user = req.user as User;

	log.info('User requested getYearlyIntervals for year %s!', year);

	const intervalSummaries: IntervalSummary[] = await bl.intervals.getYearlyIntervals(year, user);

	log.debug('Retrieved %d IntervalSummary records for year %s!', year);
	log.trace(intervalSummaries);

	res.json(intervalSummaries);
}