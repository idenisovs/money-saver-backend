import { Request, Response } from 'express';
import http from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';

const log = log4js.getLogger('update-interval');

export default async function updateInterval(req: Request, res: Response) {
    const interval = req.body;

    interval.user = req.user;

    try {
        const result = await bl.intervals.update(interval);

        res.json(result);
    } catch (err) {
        log.error(err);

        res.status(http.INTERNAL_SERVER_ERROR).json(err);
    }
}