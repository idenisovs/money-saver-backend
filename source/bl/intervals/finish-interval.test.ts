import { finishInterval } from './finish-interval';
import dal from '../../dal';
import makeTestData from '../../support/make-test-data';

jest.mock('../../dal', () => {
  return {
    __esModule: true,
    default: {
      intervals: {
        update: jest.fn(),
      },
    },
  };
});

const finishIntervalMock = jest.mocked(dal.intervals.update);

describe('finish-interval', () => {
  it('should reset the latest flag', async () => {
    const { interval, user } = makeTestData();

    await finishInterval(interval, user);

    expect(interval.latest).toBeFalsy();
    expect(finishIntervalMock).toHaveBeenCalled();
  });

  it('update the end date of interval to the day before today', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-02-29T16:14:10.692Z'))

    const { interval, user } = makeTestData();

    interval.end = '2024-03-10';

    await finishInterval(interval, user);

    expect(finishIntervalMock).toHaveBeenCalled();
    const expectedDate = '2024-02-29';
    expect(interval.end).toEqual(expectedDate);
  });

  it('should not update the end date of interval if interval is done', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-02-29T16:14:10.692Z'))

    const { interval, user } = makeTestData();

    interval.end = '2024-02-20';

    await finishInterval(interval, user);

    expect(finishIntervalMock).toHaveBeenCalled();
    expect(interval.end).toEqual(interval.end);
  });

  beforeEach(() => {
    jest.useRealTimers();
  })
});