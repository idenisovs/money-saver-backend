import { Request, Response } from 'express';
import http from 'http-status';
import bl from '../../bl';
import { User } from '../../shared';

export default async function getPayments(req: Request, res: Response) {
	try {
		const payments = await bl.payments.get(req.query, req.user as User);

		res.json(payments);
	} catch (e) {
		res.status(http.INTERNAL_SERVER_ERROR).json(e);
	}
}
