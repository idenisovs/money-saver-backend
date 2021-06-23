import { format } from 'util';
import log4js from 'log4js';
import dal from '../../../dal';
import { Request } from 'express';
import { User } from '../../../shared';

const log = log4js.getLogger('delete-payment');

const NO_INTERVAL_MESSAGE = 'There is no interval with such id: %d!';

export default async function deleteByIntervalId(req: Request): Promise<number> {
    log.debug('Removing payments by interval id!');

    const intervalId = parseInt(req.query.intervalId as string);
    const user = req.user as User;

    const interval = await dal.intervals.getById(intervalId, user);

    if (!interval) {
        throw new Error(format(NO_INTERVAL_MESSAGE, intervalId));
    }

    return await dal.payments.deleteByInterval(interval, user);
}