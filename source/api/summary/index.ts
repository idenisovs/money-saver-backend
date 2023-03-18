import { Router } from 'express';
import getExpensesSummary from './get-expenses-summary';

const summary = Router();

summary.get('/expenses', getExpensesSummary);

export default summary;
