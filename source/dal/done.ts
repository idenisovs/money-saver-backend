type MapperFunction<T1, T2> = (value: T1) => T2;

function done<T1 = void, T2 = void>(resolve: Function, reject: Function, mapper?: MapperFunction<T1, T2>) {
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

		resolve(mapper(result));
	}
}

export default done;