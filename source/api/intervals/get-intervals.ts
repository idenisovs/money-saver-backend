import { Request, Response } from 'express';
import states from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { Interval, User } from '../../shared';

const log = log4js.getLogger('get-intervals');

export default function getIntervals(req: Request, res: Response) {
	const time = req.query.timestamp ? req.query.timestamp : null;

	if (time) {
		log.debug('Taking interval by time: %s', time);
		let interval = { time: time, user: req.user };
		bl.intervals.getByTime(interval, success, error);
		return;
	}

	const from = req.query.from ? req.query.from : null;
	const till = req.query.till ? req.query.till : null;

	if (from || till) {
		log.debug('Taking interval by boundary: from %s to %s', from, till);
		let interval = { from: from, till: till, user: req.user };
		bl.intervals.getByBoundary(interval, success, error);
		return;
	}

	log.debug('No query params defined, returning list of all intervals...');

	bl.intervals.getAll(req.user as User, success, error);

	function success(result: Interval[]) {
		log.trace(result);
		res.json(result);
	}

	function error(err: Error) {
		log.error(err);
		res.status(states.INTERNAL_SERVER_ERROR).json({ err });
	}
}
