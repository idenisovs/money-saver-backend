import { Interval, User } from '../../shared';
import dal from '../../dal';
import { DAY } from '../../shared/constants';
import { endOfDay } from '../../shared/utils';

export async function finishInterval(interval: Interval, user: User): Promise<void> {
  const today = new Date();

  interval.latest = false;

  if (interval.end > today) {
    const finishDate = new Date(today.getTime() - DAY);

    interval.end = endOfDay(finishDate, user.timezone);
  }

  await dal.intervals.update(interval, user);
}