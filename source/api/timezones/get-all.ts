import log4js from 'log4js';
import { Request, Response } from 'express';
import dal from '../../dal';

const log = log4js.getLogger('timezones');

function getAll(req: Request, res: Response) {
	log.debug('User requested all timezones!');
	res.json(dal.timezones.getAll());
}
