import { NextFunction, Request, Response } from 'express';
import log4js from 'log4js';

const log = log4js.getLogger('delay');

export function delay(ms = 1000) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { originalUrl, method } = req;

		log.warn('Delay middleware in %s %s for %d ms!', method, originalUrl, ms);

		setTimeout(next, ms);
	};
}