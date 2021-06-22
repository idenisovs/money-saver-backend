import { Request, Response } from 'express';
import statusCode from 'http-status';
import bl from '../../bl';
import { User } from '../../shared';

export default async function getPaymentsSummary(req: Request, res: Response) {
    const user = req.user as User;
    const intervalId = parseInt(req.query.intervalid as string);

    try {
        const summary = await bl.summary.payments(intervalId, user);
        res.json(summary);
    } catch (e) {
        const msg = e.message;

        if (msg === 'Interval not found!') {
            res.status(statusCode.NOT_FOUND);
        } else {
            res.status(statusCode.INTERNAL_SERVER_ERROR);
        }

        res.json(e);
    }
}