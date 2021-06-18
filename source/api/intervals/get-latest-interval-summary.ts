import { Request, Response } from 'express';
import statusCodes from 'http-status';
import log4js from 'log4js';

import bl from '../../bl';
import { Interval } from '../../shared';

const log = log4js.getLogger('intervals');

function getLatestIntervalSummary(req: Request, res: Response) {
	log.debug('User requested latest interval summary!');

	bl.intervals.getLatestSummary(req.user, success, error);

	function success(interval: Interval) {
		log.debug('Got response!');
		log.trace(interval);

		if (!interval) {
			return res.status(statusCodes.NO_CONTENT).json(null);
		}

		res.json(interval);
	}

	function error(err: Error) {
		log.error(err);
		res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ err: err });
	}
}

module.exports = getLatestIntervalSummary;
