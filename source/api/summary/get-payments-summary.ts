import { Request, Response } from 'express';
import statusCode from 'http-status';
import bl from '../../bl';
import { User } from '../../shared';
import log4js from 'log4js';

const log = log4js.getLogger('payments-summary');

export default async function getPaymentsSummary(req: Request, res: Response) {
    log.debug('Arrived client request!');

    const user = req.user as User;
    const intervalId = parseInt(req.query.intervalid as string);

    try {
        const summary = await bl.summary.payments(intervalId, user);

        log.trace(summary);

        res.json(summary);
    } catch (e) {
        log.error(e);

        const msg = e.message;

        if (msg === 'Interval not found!') {
            res.status(statusCode.NOT_FOUND);
        } else {
            res.status(statusCode.INTERNAL_SERVER_ERROR);
        }

        res.json(e);
    }
}