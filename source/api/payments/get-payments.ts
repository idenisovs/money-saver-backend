import { Request, Response } from 'express';
import http from 'http-status';
import bl from '../../bl';
import { Payment } from '../../shared';

export default function getPayments(req: Request, res: Response) {
	const query = {
		...req.query,
		user: req.user
	};

	bl.payments.get(query, success, error);

	function success(payments: Payment[]) {
		res.json(payments);
	}

	function error(err: Error) {
		res.status(http.INTERNAL_SERVER_ERROR).json(err);
	}

}