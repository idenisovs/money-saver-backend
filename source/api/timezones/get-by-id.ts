import { Request, Response } from 'express';
import http from 'http-status';
import log4js from 'log4js';
import dal from '../../dal';

const log = log4js.getLogger('timezones');

export default function getTzById(req: Request, res: Response) {
	log.debug('User requested specific timezone <%s>!', req.params.id);

	const tzId = parseInt(req.params.id);

	const timezone = dal.timezones.getById(tzId);

	if (!timezone) {
		return res.status(http.NOT_FOUND).send();
	}

	res.json(timezone);
}