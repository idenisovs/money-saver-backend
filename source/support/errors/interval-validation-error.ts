export default class IntervalValidationError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, IntervalValidationError.prototype);
	}
}
