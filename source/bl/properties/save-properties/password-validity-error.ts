export default class PasswordValidityError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, PasswordValidityError.prototype);
	}
}
