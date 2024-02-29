import { DailyExpensesOverview, Interval, Summary, User } from '../shared';

export function makeDailyExpenses(): DailyExpensesOverview[] {
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

export function makeUser(): User {
  return {
    id: 1,
    login: 'user1',
    email: 'user1@example.com',
    timezone: 'Europe/Riga',
    language: 'en'
  }
}

export function makeInterval(): Interval {
  const interval = new Interval();

  interval.start = new Date('2023-11-10T00:00:00+0300');
  interval.end = new Date('2023-11-19T23:59:59.999+0300');
  interval.sum = 140;
  interval.latest = true;

  return interval;
}

function makeSummary(interval: Interval) {
  const summary = new Summary();

  summary.interval = interval;
  summary.dailyExpenses = makeDailyExpenses();

  return summary;
}

export default function makeTestData() {
  const user = makeUser();
  const interval = makeInterval();
  const summary = makeSummary(interval);

  return { summary, user, interval };
}