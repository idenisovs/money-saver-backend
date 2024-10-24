import { DailyExpensesOverview, Interval, Summary, User } from '../shared';

export function makeDailyExpenses(): DailyExpensesOverview[] {
  return [
    new DailyExpensesOverview({
      date: '2023-11-11',
      expenses: 5
    }),
    new DailyExpensesOverview({
      date: '2023-11-12',
      expenses: 5
    }),
    new DailyExpensesOverview({
      date: '2023-11-13',
      expenses: 5
    }),
    new DailyExpensesOverview({
      date: '2023-11-14',
      expenses: 5
    }),
    new DailyExpensesOverview({
      date: '2023-11-15',
      expenses: 0
    }),
    new DailyExpensesOverview({
      date: '2023-11-16',
      expenses: 0
    }),
    new DailyExpensesOverview({
      date: '2023-11-17',
      expenses: 0
    }),
    new DailyExpensesOverview({
      date: '2023-11-18',
      expenses: 0
    }),
    new DailyExpensesOverview({
      date: '2023-11-19',
      expenses: 0
    }),
    new DailyExpensesOverview({
      date: '2023-11-20',
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

  interval.start = '2023-11-10';
  interval.end = '2023-11-19';
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