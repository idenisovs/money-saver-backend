import { Router } from 'express';
import getExpensesByInterval from './get-by-interval';

const expenses = Router();

expenses.get('/', getExpensesByInterval);

export default expenses;