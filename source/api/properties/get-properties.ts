import { Request, Response } from 'express';
import http from 'http-status';
import log4js from 'log4js';

import { User } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('properties');

export default async function getProperties(req: Request, res: Response) {
	const user = req.user as User;

	log.debug('Retrieving properties for user %s (%d).', user.login, user.id);

	try {
		const properties = await dal.properties.get(user);
		log.debug('Success for user %s (%d)!', user.login, user.id);
		res.json(properties);
	} catch (e) {
		log.error(e);
		res.status(http.INTERNAL_SERVER_ERROR).json(e);
	}
}
