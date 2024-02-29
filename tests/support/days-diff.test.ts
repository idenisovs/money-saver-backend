import { daysDiff } from '../../source/shared/utils';

describe('datesDiff', () => {
  it('Basic check', () => {
    const date1 = new Date('2021-06-01');
    const date2 = new Date('2021-06-02');

    const result = daysDiff(date2, date1);

    expect(result).toBe(1);
  });

  it('Day and a half day difference', () => {
    const date1 = new Date('2021-06-01T00:00:00');
    const date2 = new Date('2021-06-02T15:30:59');

    const result = daysDiff(date2, date1);

    expect(result).toBeCloseTo(1.6, 1);
  });

  it('Hours difference is less than dates difference', () => {
    const date1 = new Date('2021-06-01T18:18:18');
    const date2 = new Date('2021-06-02T00:00:00');

    const result = daysDiff(date2, date1);

    expect(result).toBeCloseTo(0.2, 1);
  });

  it('Intervals example', () => {
    const date1 = new Date('2021-06-23T21:00:00.000Z');
    const date2 = new Date('2021-06-30T20:59:59.999Z');

    const result = daysDiff(date1, date2);

    expect(result).toBeCloseTo(7, 1);
  });

  it('should return the proper day difference for 16-day issue', () => {
    const date1 = new Date('2024-02-18T22:00:00.000Z');
    const date2 = new Date('2024-03-05T21:59:00.000Z');

    const result = daysDiff(date1, date2);

    expect(result).toBeCloseTo(16, 1);
  });
});