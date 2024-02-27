import { getTimezoneOffset, getDateStr, startOfDay, endOfDay } from '../../source/shared/utils';
import { HOUR } from '../../source/shared/constants';

describe('getDateStr', () => {
	it('returns correct string', () => {
		const d1 = new Date('2024-02-03T12:12:12.999Z');

		const result = getDateStr(d1);

		expect(result).toBe('2024-02-03');
	});
});

describe('findTimezoneOffset', () => {
	it('should be 2 hours in Riga during the Winter time', () => {
		const date = new Date('2021-01-23T12:23:34+02:00');
		const offset = getTimezoneOffset(date, 'Europe/Riga');
		expect(offset/HOUR).toBe(2);
	});

	it('should be 3 hours in Riga during the Summer time', () => {
		const date = new Date('2021-06-23T12:23:34+02:00');
		const offset = getTimezoneOffset(date, 'Europe/Riga');
		expect(offset/HOUR).toBe(3);
	});
});

describe('startOfDay', () => {
	it('should calculate the proper start of day in Riga in Winter', () => {
		const theWinterDayInRiga = new Date('2024-02-27T15:55:55.123+02:00');

		const startOfDayInRigaInUTC = startOfDay(theWinterDayInRiga, 'Europe/Riga');

		expect(startOfDayInRigaInUTC.toISOString()).toBe('2024-02-26T22:00:00.000Z');
	});

	it('should calculate the proper start of day in Los Angeles in Summer', () => {
		const theSummerDayInLA = new Date('2023-06-30T15:55:55.123+02:00');

		const startOfDayInRigaInUTC = startOfDay(theSummerDayInLA, 'America/Los_Angeles');

		expect(startOfDayInRigaInUTC.toISOString()).toBe('2023-06-30T07:00:00.000Z');
	});

	it('should calculate the proper start of day in UTC', () => {
		const theSummerDayInUTC = new Date('2023-06-30T15:55:55.123Z');

		const startOfDayInUTC = startOfDay(theSummerDayInUTC, 'UTC');

		expect(startOfDayInUTC.toISOString()).toBe('2023-06-30T00:00:00.000Z');
	});

	it('should calculate the proper start of day for date at 00:00:00', () => {
		const theSummerDayInRiga = new Date('2023-06-30T00:00:00.000+03:00');

		const startOfDayInUTC = startOfDay(theSummerDayInRiga, 'Europe/Riga');

		expect(startOfDayInUTC.toISOString()).toBe('2023-06-29T21:00:00.000Z');
	});

	it('should calculate the proper start of day for date at 23:59:59', () => {
		const theSummerDayInRiga = new Date('2023-06-30T23:59:59.999+03:00');

		const startOfDayInUTC = startOfDay(theSummerDayInRiga, 'Europe/Riga');

		expect(startOfDayInUTC.toISOString()).toBe('2023-06-29T21:00:00.000Z');
	});
});

describe('endOfDay', () => {
	it('should calculate the proper End Of Day in Riga in Winter', () => {
		const theWinterDayInRiga = new Date('2024-02-27T15:55:55.123+02:00');

		const theEndOfDayInRigaInUTC = endOfDay(theWinterDayInRiga, 'Europe/Riga');

		expect(theEndOfDayInRigaInUTC.toISOString()).toBe('2024-02-27T21:59:59.999Z');
	});

	it('should calculate the proper End Of Day in LA in Summer', () => {
		const theSummerDayInLA = new Date('2024-02-27T15:55:55.123+02:00');

		const theEndOfDayInLA = endOfDay(theSummerDayInLA, 'America/Los_Angeles');

		expect(theEndOfDayInLA.toISOString()).toBe('2024-02-28T07:59:59.999Z');
	});

	it('should calculate the proper End Of Day in UTC', () => {
		const theSummerDayInUTC = new Date('2023-06-30T15:55:55.123+02:00');

		const startOfDayInUTC = endOfDay(theSummerDayInUTC, 'UTC');

		expect(startOfDayInUTC.toISOString()).toBe('2023-06-30T23:59:59.999Z');
	});

	it('should calculate the proper End Of Day for date at 23:59:59', () => {
		const theSummerDayInRiga = new Date('2023-06-15T23:59:59.999+03:00');

		const theEndOfSummerDayInRiga = endOfDay(theSummerDayInRiga, 'Europe/Riga');

		expect(theEndOfSummerDayInRiga.toISOString()).toBe('2023-06-15T20:59:59.999Z');
	});
})