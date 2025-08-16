import { Router } from 'express';

import getExpensesByIntervalDaily from './get-by-interval-daily';

const expenses = Router();

expenses.get('/', getExpensesByIntervalDaily);

export default expenses;
