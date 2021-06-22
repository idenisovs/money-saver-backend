export default class ItemNotFoundError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, ItemNotFoundError.prototype);
	}
}
