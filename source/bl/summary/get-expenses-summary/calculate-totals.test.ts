import { Timezone } from 'timezones.json';
import calculateTotals from './calculate-totals';
import makeTestData from './make-test-data';
import dal from '../../../dal'

describe('calculate-totals.ts', () => {
  let getByIdSpy: jest.SpyInstance<Timezone | undefined, [timezoneId: string], any>;

  beforeEach(() => {
    getByIdSpy = jest.spyOn(dal.timezones, 'getById');
  });

  it('returns the correct current day', () => {
    const serverTime = new Date('2023-11-14T01:30:00.000+0300');

    jest.useFakeTimers().setSystemTime(serverTime);

    const { summary, user, timezone } = makeTestData();

    getByIdSpy.mockImplementation(() => timezone);

    const totals = calculateTotals(summary);

    expect(totals).toMatchInlineSnapshot(`
Totals {
  "currentDay": 5,
  "currentDayPercents": 0.5,
  "days": 10,
  "expectedResidual": 100,
  "expectedResidualPercents": 0.7142857142857143,
  "expenses": 20,
  "expensesAvg": 4,
  "expensesPercent": 0.14285714285714285,
  "incomesAvg": 12,
  "residual": 120,
  "residualPercents": 0.8571428571428571,
  "startingSum": 140,
}
`);
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  })
})