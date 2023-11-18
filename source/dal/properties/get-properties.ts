import db from '../db';
import { Properties, User } from '../../shared';
import PropertiesRecord from './properties-record';

const sql = 'SELECT password, email, timezone, language FROM users WHERE id = $userId ';

export function getProperties(user: User): Promise<Properties> {
	return new Promise((resolve, reject) => {
		const params = {
			userId: user.id,
		};

		db.get(sql, params, (err: Error, result: PropertiesRecord) => {
			if (err) {
				return reject(err);
			}

			const properties: Properties = {
				password: {
					primary: '',
					confirm: '',
					hash: '',
					current: result.password,
				},
				timezone: result.timezone,
				email: result.email,
				language: result.language,
			};

			resolve(properties);
		});
	});
}
