import log4js from 'log4js';
import http from 'http-status';
import bl from '../../bl';
import { Request, Response } from 'express';

const log = log4js.getLogger('delete-payment')

export default async function deletePayments(req: Request, res: Response) {
    log.debug('Arrived request to delete payments!');

	try {
        const removed = await bl.payments.remove(req);

        res.json({ removed });
    } catch (e) {
	    res.status(http.INTERNAL_SERVER_ERROR).json(e);
    }
}