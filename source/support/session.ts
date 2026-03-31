import session, { SessionOptions, Store } from 'express-session';
import ConnectMemcached from 'connect-memcached';

import log4js from 'log4js';
import { v4 as uuid } from 'uuid';
import argv from './argv';

const log = log4js.getLogger('session');

function makeMemcachedStore(): Store {
	const MemcachedStore = ConnectMemcached(session);

	const hosts = ['127.0.0.1:11211'];
	const secret = process.env.MEMCACHED_KEY || uuid();

	return new MemcachedStore({ hosts, secret });
}

export default function createSession() {
	const config: SessionOptions = {
		secret: process.env.SESSION_KEY || uuid(),
		resave: false,
		saveUninitialized: true,
	};

	if (argv.memcached || process.env.MEMCACHED === 'true') {
		config.store = makeMemcachedStore();
	} else {
		log.warn('Memcached Session Store is not enabled, using MemoryStore instead!');
	}

	return session(config);
}
