import { DailyExpensesOverview, Interval, Summary, User } from '../../../shared';
import { Timezone } from 'timezones.json';

function makeDailyExpenses(): DailyExpensesOverview[] {
  return [
    new DailyExpensesOverview({
      date: new Date('2023-11-11T12:00:00+0300'),
      expenses: 5
    }),
    new DailyExpensesOverview({
      date: new Date('2023-11-12T12:00:00+0300'),
      expenses: 5
    }),
    new DailyExpensesOverview({
      date: new Date('2023-11-13T12:00:00+0300'),
      expenses: 5
    }),
    new DailyExpensesOverview({
      date: new Date('2023-11-14T12:00:00+0300'),
      expenses: 5
    }),
    new DailyExpensesOverview({
      date: new Date('2023-11-15T12:00:00+0300'),
      expenses: 0
    }),
    new DailyExpensesOverview({
      date: new Date('2023-11-16T12:00:00+0300'),
      expenses: 0
    }),
    new DailyExpensesOverview({
      date: new Date('2023-11-17T12:00:00+0300'),
      expenses: 0
    }),
    new DailyExpensesOverview({
      date: new Date('2023-11-18T12:00:00+0300'),
      expenses: 0
    }),
    new DailyExpensesOverview({
      date: new Date('2023-11-19T12:00:00+0300'),
      expenses: 0
    }),
    new DailyExpensesOverview({
      date: new Date('2023-11-20T12:00:00+0300'),
      expenses: 0
    }),
  ];
}

function makeUser(): User {
  return {
    id: 1,
    login: 'user1',
    email: 'user1@example.com',
    timezone: 'Europe/Riga',
    language: 'en'
  }
}

function makeRigaTimezone(): Timezone {
  return {
    value: 'E. Europe Standard Time',
    abbr: 'EEDT',
    offset: 3,
    isdst: true,
    text: '(UTC+02:00) E. Europe',
    utc: [
      'Asia/Nicosia',
      'Europe/Athens',
      'Europe/Bucharest',
      'Europe/Chisinau',
      'Europe/Helsinki',
      'Europe/Kyiv',
      'Europe/Mariehamn',
      'Europe/Nicosia',
      'Europe/Riga',
      'Europe/Sofia',
      'Europe/Tallinn',
      'Europe/Uzhgorod',
      'Europe/Vilnius',
      'Europe/Zaporozhye'
    ]
  }
}

export default function makeTestData() {
  const interval = new Interval();

  interval.start = new Date('2023-11-10T00:00:00+0300');
  interval.end = new Date('2023-11-19T23:59:59.999+0300');
  interval.sum = 140;

  const summary = new Summary();

  summary.interval = interval;
  summary.dailyExpenses = makeDailyExpenses();

  const user = makeUser()

  const timezone = makeRigaTimezone();

  return { summary, user, timezone };
}