export default function done<T>(resolve: Function, reject: Function) {
	return function done(err: Error, result: T) {
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	}
}