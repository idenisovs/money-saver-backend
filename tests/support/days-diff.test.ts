import { daysDiff } from '../../source/shared/utils';

describe('datesDiff', () => {
  it('Basic check', () => {
    const date1 = '2021-06-01';
    const date2 = '2021-06-02';

    const result = daysDiff(date1, date2);

    expect(result).toBe(1);
  });

  it('Intervals example', () => {
    const date1 = '2021-06-01';
    const date2 = '2021-06-30';

    const result = daysDiff(date1, date2);

    expect(result).toBe(29)
  });

  it('should return the proper day difference for 16-day issue', () => {
    const date1 = '2024-02-18';
    const date2 = '2024-03-05';

    const result = daysDiff(date1, date2);

    expect(result).toBeCloseTo(16, 1);
  });
});