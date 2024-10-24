import getCurrentDay from './get-current-day';

describe('get-current-day.ts', () => {
	it('Returns correct day difference with respect to time zone of Riga.', () => {
		const serverTime = new Date('2024-10-14T22:00:00.000Z');

		jest.useFakeTimers();
		jest.setSystemTime(serverTime);

		const days = getCurrentDay('2024-10-15');

		expect(days).toBe(1);
	});

	afterAll(() => {
		jest.getRealSystemTime();
	})
});