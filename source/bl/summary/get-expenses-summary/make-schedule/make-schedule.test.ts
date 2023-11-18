import makeSchedule from '.';
import dal from '../../../../dal';
import { Interval, Payment, User } from '../../../../shared';

jest.mock('../../../../dal', () => {
	return {
		__esModule: true,
		default: {
			expenses: {
				getByInterval: jest.fn(),
			},
			payments: {
				getByDateRange: jest.fn(),
			},
		},
	};
});

const getByDateRangeMock = jest.mocked(dal.payments.getByDateRange);

it('should make proper summary list', async () => {
	getByDateRangeMock.mockResolvedValue([
		new Payment({
			time: new Date('2023-09-30T08:41:39.222Z'),
			sum: 1,
		}),
		new Payment({
			time: new Date('2023-10-01T11:45:57.732Z'),
			sum: 2,
		}),
		new Payment({
			time: new Date('2023-10-01T23:45:57.732Z'),
			sum: 1,
		}),
		new Payment({
			time: new Date('2023-10-02T01:45:57.732Z'),
			sum: 2,
		}),
	]);

	const interval = new Interval({
		start: new Date('2023-09-29T21:00:00.000Z'),
		end: new Date('2023-10-04T21:00:00.000Z'),
		sum: 100,
	});

	const user: User = {
		id: 1,
		login: 'john',
		email: 'john.doe@example.com',
		timezone: 'Europe/Riga',
		language: 'en',
	};

	const schedule = await makeSchedule(interval, user);

	expect(schedule).toBeDefined();
	expect(schedule.length).toBe(6);
	expect(schedule[0].expenses).toBe(1);
	expect(schedule[1].expenses).toBe(2);
	expect(schedule[2].expenses).toBe(3);
});
