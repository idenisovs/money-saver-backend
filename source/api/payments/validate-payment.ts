import { Request, Response } from 'express';
import status from 'http-status';
import log4js from 'log4js';
import { Payment, User } from '../../shared';

const log = log4js.getLogger('validate-payments');

export default function validatePayments(req: Request, res: Response, next: Function) {
	const payments: Payment[] = Array.isArray(req.body) ? req.body : [req.body];

	log.debug('Running for %d payments!', payments.length);

	const invalidPayment = payments.find(invalidPayments);

	if (!invalidPayment) {
		return next();
	}

	const user: User = req.user as User;

	log.warn('Rejecting payments from user %d, missing Sum field: %j.', user.id, invalidPayment);

	res.status(status.EXPECTATION_FAILED).json({
		message: 'Sum field is required!',
		rejected: invalidPayment,
	});
}

function invalidPayments(payment: Payment) {
	return !isNumber(payment.sum) && !payment.remove;
}

function isNumber(o: any) {
	return !isNaN(o - 0) && o !== null && o !== '' && o !== false;
}
