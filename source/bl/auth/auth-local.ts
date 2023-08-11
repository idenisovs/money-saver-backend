import bcrypt from 'bcrypt';
import log4js from 'log4js';
import dal from '../../dal';

const log = log4js.getLogger('auth');

export function auth(username: string, password: string, done: Function) {
	let user: any;

	log.debug('Authorization of user %s...', username);

	dal.users.getByName(username).then(validateUsername);

	function validateUsername(userRecord: any) {
		if (!userRecord) {
			return reject();
		}

		user = userRecord;

		bcrypt.compare(password, user.password, validatePassword);
	}

	function validatePassword(error: Error | undefined, passValid: boolean) {
		if (error) {
			return fail(error);
		}

		if (!passValid) {
			return reject();
		}

		log.info('%s successfully authenticated!', username);

		delete user.password;

		done(null, user);

		dal.users.saveLoginTime(user).then(timeSaveDone);
	}

	function reject() {
		log.warn('Rejecting user %s with password %s!', username, password);
		done(null, false, { message: 'Incorrect login or password!' });
	}

	function timeSaveDone() {
		log.debug('Done!');
	}

	function fail(error: Error) {
		log.error(error);
		done(error);
	}
}
