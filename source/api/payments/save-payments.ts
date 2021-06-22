import http from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { Request, Response } from 'express';
import { User } from '../../shared';

const log = log4js.getLogger('save-payments');

export default async function savePayments(req: Request, res: Response) {
    log.debug('Arrived request to save payments!');

	const user = req.user as User;

	try {
        await bl.payments.save(req.body, user);

        res.send();
    } catch(e) {
        res.status(http.INTERNAL_SERVER_ERROR).json(e);
    }
}