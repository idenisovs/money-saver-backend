import { Request, Response } from 'express';
import http from 'http-status';
import log4js from 'log4js';
import { Properties, User } from '../../shared';
import bl from '../../bl';

const log = log4js.getLogger('properties');

export default async function saveProperties(req: Request, res: Response) {
	const properties = req.body as Properties;
	const user = req.user as User;

	log.debug('Saving properties for user %s (%d).', user.login, user.id);

	try {
		await bl.properties.save(req.body, user);

		user.password = properties.password.hash;
		user.email = properties.email;
		user.timezone = properties.timezone.timeZoneId;
	} catch (e) {
		const { message } = e as Error;

		if (message && message.match(/^PROPERTIES_/)) {
			res.status(http.BAD_REQUEST).json(e);
		} else {
			res.status(http.INTERNAL_SERVER_ERROR).json(e);
		}
	}
}
