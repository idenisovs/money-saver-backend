import { daysDiff } from '../../../shared/utils';

describe('daysDiff util', () => {
  it('works correctly if current time in the middle of the day', () => {
    const serverTime = new Date('2023-11-14T12:30:00.000+0300');

    jest.useFakeTimers().setSystemTime(serverTime);

    const intervalStart = new Date('2023-11-10T00:00:00.000+0300');
    const currentTime = new Date();

    const days = daysDiff(intervalStart, currentTime);

    expect(days).toBe(5);
  });

  it('works correctly if current time in the start of the day', () => {
    const serverTime = new Date('2023-11-14T00:00:00.001+0300');

    jest.useFakeTimers().setSystemTime(serverTime);

    const intervalStart = new Date('2023-11-10T00:00:00.000+0300');
    const currentTime = new Date();

    const days = daysDiff(intervalStart, currentTime);

    expect(days).toBe(5);
  });

  it('works correctly if current time in the end of the day', () => {
    const serverTime = new Date('2023-11-14T23:59:59.999+0300');

    jest.useFakeTimers().setSystemTime(serverTime);

    const intervalStart = new Date('2023-11-10T00:00:00.000+0300');
    const currentTime = new Date();

    const days = daysDiff(intervalStart, currentTime);

    expect(days).toBe(5);
  });

  afterAll(() => {
    jest.useRealTimers();
  })
});