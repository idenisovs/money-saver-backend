import { Request, Response } from 'express';
import http from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { User } from '../../shared';
import processPaymentDtos from './process-payment-dtos';

const log = log4js.getLogger('update-payments');

export default async function updatePayments(req: Request, res: Response) {
	log.debug('Arrived request to update payments!');

	const user = req.user as User;
	const payments = processPaymentDtos(req.body);

	try {
        await bl.payments.update(payments, user);

        res.send();
    } catch (e) {
        res.status(http.INTERNAL_SERVER_ERROR).json(e);
    }
}