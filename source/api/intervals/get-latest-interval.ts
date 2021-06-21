import { Request, Response } from 'express';
import states from 'http-status';
import log4js from 'log4js';

import { User } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('get-latest-interval');

export default async function getLatestInterval(req: Request, res: Response) {
    const user = req.user as User;

    log.debug('User %s requested latest interval!', user.login);

    try {
        const latestInterval = await dal.intervals.getLatest(user);

        if (!latestInterval) {
            log.warn('There is no intervals yet!');

            return res.status(states.NO_CONTENT).send();
        }

        log.trace(latestInterval);

        res.json(latestInterval);
    } catch (err) {
        log.error(err);
        res.status(states.INTERNAL_SERVER_ERROR).json({ err: err });
    }
}