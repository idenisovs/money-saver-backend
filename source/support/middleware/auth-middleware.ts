import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status';
import log4js from 'log4js';

const log = log4js.getLogger('auth');

export default function auth(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }

    log.warn('Unauthorized access try to %s from %s!', req.originalUrl, req.ip);

    const message = 'Hello, %username%! Please, authenticate yourself first!';

    res.status(HttpStatus.UNAUTHORIZED).send(message);
};
