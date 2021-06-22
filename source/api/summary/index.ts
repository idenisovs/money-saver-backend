import { Router } from 'express';
import getPaymentsSummary from './get-payments-summary';

const summary = Router();

summary.get('/payments', getPaymentsSummary);

export default summary;