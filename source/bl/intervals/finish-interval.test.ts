import { finishInterval } from './finish-interval';
import dal from '../../dal';
import makeTestData from '../../support/make-test-data';
import { DAY } from '../../shared/constants';

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

    interval.end = new Date(Date.now() + 10 * DAY);

    await finishInterval(interval, user);

    expect(finishIntervalMock).toHaveBeenCalled();
    const expectedDate = new Date('2024-02-28T21:59:59.999Z');
    expect(interval.end).toEqual(expectedDate);
  });

  it('should not update the end date of interval if interval is done', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-02-29T16:14:10.692Z'))

    const { interval, user } = makeTestData();

    interval.end = new Date(Date.now() - 10 * DAY);

    await finishInterval(interval, user);

    expect(finishIntervalMock).toHaveBeenCalled();
    const expectedDate = new Date('2024-02-19T16:14:10.692Z');
    expect(interval.end).toEqual(expectedDate);
  });

  beforeEach(() => {
    jest.useRealTimers();
  })
});