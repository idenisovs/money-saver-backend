import { Request, Response } from 'express';
import states from 'http-status';
import dal from '../../dal';
import { User } from '../../shared';

export default async function getIntervalById(req: Request, res: Response) {
	const intervalId = parseInt(req.params.id);

	try {
        const interval = await dal.intervals.getById(intervalId, req.user as User);

        if (interval) {
            res.json(interval);
        } else {
            res.status(states.NOT_FOUND).send();
        }
    } catch(e) {
		res.status(states.INTERNAL_SERVER_ERROR).json(e);
    }

}

module.exports = getIntervalById;
