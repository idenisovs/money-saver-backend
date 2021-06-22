import { Password } from '../../../shared';
import PasswordValidityError from './password-validity-error';

export default function validatePassword(password: Password) {
	if (password.primary !== password.confirm) {
		throw new PasswordValidityError('PROPERTIES_PASSWORD_NOT_MATCH');
	}

	if (password.primary.length < 8) {
        throw new PasswordValidityError('PROPERTIES_PASSWORD_TOO_SHORT');
	}

	if (!password.primary.match(/[A-Z]/)) {
        throw new PasswordValidityError('PROPERTIES_PASSWORD_LETTER');
	}

	if (!password.primary.match(/\d/)) {
        throw new PasswordValidityError('PROPERTIES_PASSWORD_NUMBER');
	}
}