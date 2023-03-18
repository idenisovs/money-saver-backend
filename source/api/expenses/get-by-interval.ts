import { Request, Response } from 'express';
import dal from '../../dal';
import { User } from '../../shared';

export default async function getExpensesByInterval(req: Request, res: Response) {
	const user = req.user as User;

	const interval = await dal.intervals.getLatest(user);

	const expenses = await dal.expenses.getByInterval(interval, user);

	res.json(expenses);
}
