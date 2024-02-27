import { User } from '../../../shared';
import { getTimezoneOffset } from '../../../shared/utils';

export default function getCurrentLocalTime(user: User): Date {
  const currentTime = new Date();
  const timezoneOffset = getTimezoneOffset(currentTime, user.timezone);
  return new Date(currentTime.getTime() + timezoneOffset);
}