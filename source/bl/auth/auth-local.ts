import bcrypt from 'bcrypt';
import log4js from 'log4js';
import dal from '../../dal';

const log = log4js.getLogger('auth');

export default function auth(username: string, password: string, done: Function) {
    let user: any;

    log.debug('Authorization of user %s...', username);

    dal.users.getByName(username, validateUsername);

    function validateUsername(error: Error, userRecord: any) {
        if (error) {
            return fail(error);
        }

        if (!userRecord) {
            return reject();
        }

        user = userRecord;

        bcrypt.compare(password, user.password, validatePassword);
    }

    function validatePassword(error: Error|undefined, passValid: boolean) {
        if (error) {
            return fail(error);
        }

        if (!passValid) {
            return reject();
        }

        log.info('%s successfully authenticated!', username);

        delete user.password;

        done(null, user);

        dal.users.saveLoginTime(user, timeSaveDone);
    }

    function reject() {
        log.warn('Rejecting user %s with password %s!', username, password);
        done(null, false, {message: 'Incorrect login or password!'});
    }

    function timeSaveDone(err: Error) {
        if (err) {
            log.error(err);
        }
    }

    function fail(error: Error) {
        log.error(error);
        done(error);
    }
}
