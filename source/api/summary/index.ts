import { Router } from 'express';
import getExpensesSummary from './get-expenses-summary';

const summary = Router();

summary.get('/expenses', getExpensesSummary);
summary.get('/expenses/:interval_id', getExpensesSummary);

export default summary;
