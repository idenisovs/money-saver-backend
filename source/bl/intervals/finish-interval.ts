import { DateTime } from 'luxon';

import { Interval, User } from '../../shared';
import dal from '../../dal';

export async function finishInterval(interval: Interval, user: User): Promise<void> {
  const today = DateTime.local().setZone(user.timezone).toISODate() as string;

  interval.latest = false;

  if (interval.end > today) {
    interval.end = today;
  }

  await dal.intervals.update(interval, user);
}