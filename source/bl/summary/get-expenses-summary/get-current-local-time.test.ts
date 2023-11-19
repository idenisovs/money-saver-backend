import getCurrentLocalTime from './get-current-local-time';
import makeTestData from './make-test-data';
import dal from '../../../dal';

describe('getCurrentLocalTime', () => {
  it('returns the correct time for Riga timezone', () => {
    const serverTime = new Date('2023-11-18T12:00:00.000Z');

    jest.useFakeTimers().setSystemTime(serverTime);

    const { user, timezone } = makeTestData();

    const getByIdSpy = jest.spyOn(dal.timezones, 'getById');

    getByIdSpy.mockImplementation(() => timezone);

    const localTime = getCurrentLocalTime(user);

    const serverTimeHours = serverTime.getHours();

    expect(serverTimeHours).toBe(12);

    const localTimeHours = localTime.getHours();

    expect(localTimeHours).toBe(serverTimeHours + 3);
  });

  afterAll(() => {
    jest.getRealSystemTime();
  })
});