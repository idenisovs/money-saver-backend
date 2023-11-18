import timezones, { Timezone } from 'timezones.json';

export function getTimezoneById(timezoneId: string): Timezone|undefined {
  return timezones.find((item) => {
    return item.utc.includes(timezoneId)
  });
}