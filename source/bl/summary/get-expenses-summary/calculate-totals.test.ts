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

    const { summary, timezone } = makeTestData();

    getByIdSpy.mockImplementation(() => timezone);

    const totals = calculateTotals(summary);

    expect(totals).toMatchInlineSnapshot(`
Totals {
  "currentDay": 4.0625,
  "currentDayPercents": 0.40625,
  "days": 10,
  "expectedResidual": 90.76923076923077,
  "expectedResidualPercents": 0.6483516483516484,
  "expenses": 20,
  "expensesAvg": 4.923076923076923,
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