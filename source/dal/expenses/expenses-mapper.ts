import { ExpensesRecord } from './expenses-record';
import { Expenses } from '../../shared';

export default function expensesMapper(record: ExpensesRecord): Expenses {
	return new Expenses({
		date: new Date(record.date),
		sum: record.sum,
	});
}
