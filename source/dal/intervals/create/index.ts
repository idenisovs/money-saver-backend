import log4js from 'log4js';
import { Interval } from '../../../shared';
import resetLatest from './reset-latest';
import create from './create-interval';

const log = log4js.getLogger('create-interval');

export default async function createInterval(interval: Interval): Promise<number> {
    log.debug('createInterval called for user %s', interval.user.login);

    await resetLatest(interval.user.id);

    return await create(interval);
}