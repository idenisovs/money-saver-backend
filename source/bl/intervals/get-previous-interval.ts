import dal from '../../dal';
import { Interval, User } from '../../shared';
import ItemNotFoundError from '../../support/errors/item-not-found';

export async function getPreviousInterval(intervalId: number, user: User): Promise<Interval | null> {
	const currentInterval = await dal.intervals.getById(intervalId, user);

	if (!currentInterval) {
		throw new ItemNotFoundError(`There is no interval with id ${intervalId}!`);
	}

	return dal.intervals.getPrevious(currentInterval, user);
}
