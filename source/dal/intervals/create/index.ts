import log4js from 'log4js';
import { Interval, User } from '../../../shared';
import resetLatest from './reset-latest';
import createInterval from './create-interval';

const log = log4js.getLogger('create-interval');

export async function create(interval: Interval, user: User): Promise<number> {
    log.debug('createInterval called for user %s', user.login);

    await resetLatest(user.id);

    return await createInterval(interval, user);
}