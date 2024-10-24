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
			date: '2023-09-30',
			sum: 1,
		}),
		new Payment({
			date: '2023-10-01',
			sum: 2,
		}),
		new Payment({
			date: '2023-10-01',
			sum: 1,
		}),
		new Payment({
			date: '2023-10-02',
			sum: 2,
		}),
	]);

	const interval = new Interval({
		start: '2023-09-30',
		end: '2023-10-05',
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
	expect(schedule[1].expenses).toBe(3);
	expect(schedule[2].expenses).toBe(2);
});
