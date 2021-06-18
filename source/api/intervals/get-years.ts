import { Request, Response } from 'express';
import httpCodes from 'http-status';
import log4js from 'log4js';
import bl from '../../bl';
import { User } from '../../shared';

const log = log4js.getLogger('get-years');

export default function getAvailableYears(req: Request, res: Response) {
    const user = req.user as User;

    log.debug('Requesting years for user %s!', user.login);

    bl.intervals.getYears(user, success, error);

    function success(years: number[]) {
        res.json(years);
    }

    function error(err: Error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = getAvailableYears;
