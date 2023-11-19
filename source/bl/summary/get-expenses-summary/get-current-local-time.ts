import { User } from '../../../shared';
import { HOUR } from '../../../shared/constants';
import dal from '../../../dal'

export default function getCurrentLocalTime(user: User): Date {
  const timezone = dal.timezones.getById(user.timezone);

  if (!timezone) {
    return new Date();
  }

  const serverTime = Date.now();

  const offset = serverTime + timezone.offset * HOUR;

  return new Date(offset);
}