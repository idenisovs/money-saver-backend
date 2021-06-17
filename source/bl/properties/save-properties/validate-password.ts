import argv from '../../../support/argv';
import Password from './password';
import bcrypt from 'bcrypt';

type UpdateHashCallback = (err: Error|undefined, hash: string) => any;

export default function validatePassword(password: Password, updateHash: UpdateHashCallback, error: Function) {
    return function validator(err: Error|undefined, same: boolean) {
        if (err) {
            return error(err);
        }

        if (!same) {
            return error({ error: 'PROPERTIES_INVALID_PASSWORD' });
        }

        if (argv.testable && password.primary === 'demo1') {
            return bcrypt.hash(password.primary, 2, updateHash);
        }

        if (password.primary !== password.confirm) {
            return error({ error: 'PROPERTIES_PASSWORD_NOT_MATCH' });
        }

        if (password.primary.length < 8) {
            return error({ error: 'PROPERTIES_PASSWORD_TOO_SHORT' });
        }

        if (!password.primary.match(/[A-Z]/)) {
            return error({ error: 'PROPERTIES_PASSWORD_LETTER' });
        }

        if (!password.primary.match(/\d/)) {
            return error({ error: 'PROPERTIES_PASSWORD_NUMBER' });
        }

        bcrypt.hash(password.primary, 2, updateHash);
    }
}