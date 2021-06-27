import http from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { Request, Response } from 'express';
import { User } from '../../shared';
import processPaymentDtos from './process-payment-dtos';

const log = log4js.getLogger('save-payments');

export default async function processPayments(req: Request, res: Response) {
	const user = req.user as User;
	const payments = processPaymentDtos(req.body);

	log.debug('User <%d> made request to process <%d> payments!', user.id, payments.length);

	try {
		await bl.payments.process(payments, user);

        res.json({
			message: 'ok'
		});
    } catch(e) {
        res.status(http.INTERNAL_SERVER_ERROR).json(e);
    }
}