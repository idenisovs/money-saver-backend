type MapperFunction<T1, T2> = (value: T1) => T2;
type ResolveFn = (result?: any) => void;
type RejectFn = (error?: any) => void;

function done<T1 = void, T2 = void>(resolve: ResolveFn, reject: RejectFn, mapper?: MapperFunction<T1, T2>) {
	return (err: Error, result?: T1) => {
		if (err) {
			return reject(err);
		}

		if (!result) {
			return resolve();
		}

		if (!mapper) {
			return resolve(result);
		}

		if (Array.isArray(result)) {
			return resolve(result.map<T2>(mapper));
		}

		return resolve(mapper(result));
	};
}

export default done;
