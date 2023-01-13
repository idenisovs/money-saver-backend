import { Request, Response } from 'express';
import HttpStatusCodes from 'http-status';
import log4js from 'log4js';

import { User } from '../../shared';

const log = log4js.getLogger('auth');

export default function logout(req: Request, res: Response) {
    const user = req.user as User;

    log.debug('User %s is logging out!', user.login);

    req.logout(done);

    function done(err: any) {
        if (err) {
            log.error('Something bad happened during logout!');
            log.error(err);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        }

        res.send();
    }
}
