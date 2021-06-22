import log4js from 'log4js';
import db from '../db';
import { Properties, User } from '../../shared';
import done from '../done';

const log = log4js.getLogger('properties');

const sql = 'UPDATE users ' +
	'SET password = $hash, email = $email, timezone = $timezone, language = $language ' +
	'WHERE id = $id';

export function saveProperties(properties: Properties, user: User): Promise<void> {
	return new Promise((resolve, reject) => {
		const params = {
			$id: user.id,
			$hash: properties.password.hash,
			$email: properties.email,
			$timezone: properties.timezone.timeZoneId,
			$language: properties.language
		};

		log.trace(params);

		db.run(sql, params, done<void>(resolve, reject));
	});
}