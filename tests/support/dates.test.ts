import { daysDiff } from '../../source/support/dates';

describe('datesDiff', () => {
	it('Basic check', () => {
		const date1 = new Date('2021-06-01');
		const date2 = new Date('2021-06-02');

		const result = daysDiff(date2, date1);

		expect(result).toBe(1);
	});

	it('Day and a half still day difference', () => {
		const date1 = new Date('2021-06-01');
		const date2 = new Date('2021-06-02T15:30:59');

		const result = daysDiff(date2, date1);

		expect(result).toBe(1);
	});

	it('Hours difference is less than dates difference', () => {
		const date1 = new Date('2021-06-01T18:18:18');
		const date2 = new Date('2021-06-02T00:00:00');

		const result = daysDiff(date2, date1);

		expect(result).toBe(0);
	});

	it('Dates difference matter', () => {
		const date1 = new Date('2021-06-01T18:18:18');
		const date2 = new Date('2021-06-02T00:00:00');

		const result = daysDiff(date2, date1, true);

		expect(result).toBe(1);
	});

	it('Intervals example', () => {
		const date1 = new Date('2021-06-23T21:00:00.000Z');
		const date2 = new Date('2021-06-30T20:59:59.999Z');

		const result = daysDiff(date1, date2);

		expect(result).toBe(6);
	});
})