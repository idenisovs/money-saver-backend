export default function done<T>(resolve: (result: T) => void, reject: (error: Error) => void) {
	return function done(err: Error, result: T): void {
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	}
}