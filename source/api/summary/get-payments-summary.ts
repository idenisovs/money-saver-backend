import statusCode from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { Request, Response } from 'express';
import { Summary, User } from '../../shared';

const log = log4js.getLogger('payments-summary');

export default function getPaymentsSummary(req: Request, res: Response) {
    const user = req.user as User;
    const intervalId = parseInt(req.query.intervalid as string);

    bl.summary.payments({
        intervalId,
        id: intervalId
    }, success, fail);

    function success(summary: Summary) {
        res.json(summary);
    }

    function fail(err: string) {
        log.error(err);

        let status, response;

        switch (err) {
            case 'Interval not found!':
                status = statusCode.NOT_FOUND;
                response = { err };
                break;
            default:
                status = statusCode.INTERNAL_SERVER_ERROR;
        }

        res.status(status).json(response);
    }
}