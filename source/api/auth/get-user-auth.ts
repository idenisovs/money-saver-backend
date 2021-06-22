import { Request, Response } from 'express';
import log4js from 'log4js';
import { User } from '../../shared';

const log = log4js.getLogger('check-auth');

export default function getUserAuthentication(req: Request, res: Response) {
    log.debug('Requested user auth status!');

    const user = req.user as User;

    log.trace(user);

    if (user) {
        delete user.password;
    }

    res.json(user);
};
