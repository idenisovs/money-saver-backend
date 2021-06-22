import { Request, Response } from 'express';
import { User } from '../../shared';
import log4js from 'log4js';

const log = log4js.getLogger('auth');

export default function logout(req: Request, res: Response) {
    const user = req.user as User;

    log.debug('User %s is logging out!', user.login);

    req.logout();

    res.send();
}