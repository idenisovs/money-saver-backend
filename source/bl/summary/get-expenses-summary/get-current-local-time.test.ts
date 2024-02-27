import getCurrentLocalTime from './get-current-local-time';
import makeTestData from './make-test-data';

describe('getCurrentLocalTime', () => {
  it('returns the correct time for Riga timezone', () => {
    const serverTime = new Date('2023-11-18T12:00:00.000Z');

    jest.useFakeTimers();
    jest.setSystemTime(serverTime);

    const { user } = makeTestData();

    const localTime = getCurrentLocalTime(user);
    const localHours = localTime.getHours();

    expect(localHours).toBe(14);
  });

  afterAll(() => {
    jest.getRealSystemTime();
  })
});