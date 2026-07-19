import session, { SessionOptions, Store } from 'express-session';
import ConnectMemcached from 'connect-memcached';

import log4js from 'log4js';
import config from '../config';

const log = log4js.getLogger('session');

function makeMemcachedStore(): Store {
    if (!config.MEMCACHED_KEY) {
        throw new Error('MEMCACHED_KEY must be set in .env file!');
    }

    const MemcachedStore = ConnectMemcached(session);

    const hosts = [ '127.0.0.1:11211' ];
    const secret = config.MEMCACHED_KEY;

    return new MemcachedStore({ hosts, secret });
}

export default function createSession() {
    if (!config.SESSION_KEY) {
        throw new Error('SESSION_KEY must be set in .env file!');
    }

    const options: SessionOptions = {
        secret: config.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
    };

    if (config.MEMCACHED) {
        options.store = makeMemcachedStore();
    } else {
        log.warn('Memcached Session Store is not enabled, using MemoryStore instead!');
    }

    return session(options);
}
