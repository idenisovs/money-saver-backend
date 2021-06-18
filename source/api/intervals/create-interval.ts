import { Request, Response } from 'express';
import states from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { Interval } from '../../shared';

const log = log4js.getLogger('create-interval');

export default function createInterval(req: Request, res: Response) {
	const interval = req.body;

	interval.user = req.user;

	bl.intervals.create(interval, success, error);

	function success(interval: Interval) {
		res.json(interval);
	}

	function error(err: Error|{ reason: string }) {
		log.error(err);

		if ('reason' in err && err.reason === 'param') {
			res.status(states.BAD_REQUEST);
		} else {
			res.status(states.INTERNAL_SERVER_ERROR);
		}

		res.json(err);
	}
}