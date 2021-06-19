import util from 'util';
import dal from '../../dal';
import IntervalDeleteResult from '../../api/intervals/interval-delete-result';
import { User } from '../../shared';

export default async function deleteInterval(intervalId: number, user: User): Promise<IntervalDeleteResult> {
    const result = {
        intervalsRemoved: 0,
        paymentsRemoved: 0
    };

    const interval = await dal.intervals.getById(intervalId, user);

    if (!interval) {
        const message = util.format('There is no Interval with such id: %d!', intervalId);
        throw new Error(message);
    }

    result.paymentsRemoved = await dal.payments.deleteByInterval(interval, user);

    result.intervalsRemoved = await dal.intervals.delete(interval, user);

    return result;
}