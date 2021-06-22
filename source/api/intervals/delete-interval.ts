import { Request, Response } from 'express';
import states from 'http-status';
import bl from '../../bl';
import { User } from '../../shared';

export default async function deleteInterval(req: Request, res: Response) {
	const intervalId = parseInt(req.params.id);
	const user = req.user as User;

	try {
		const result = await bl.intervals.remove(intervalId, user);

		res.json(result);
	} catch (e) {
		if (e.message.indexOf('There is no Interval with such id') === -1) {
			res.status(states.INTERNAL_SERVER_ERROR);
		} else {
			res.status(states.NOT_FOUND);
		}

		res.json(e);
	}
}