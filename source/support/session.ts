import path from 'path';
import fs from 'fs';
import session, { SessionOptions, Store } from 'express-session';
import log4js from 'log4js';
import { v4 as uuid } from 'uuid';
import argv from './argv';

const log = log4js.getLogger('session');

export default function createSession() {
    const config: SessionOptions = {
        secret: readKey('session.key'),
        resave: false,
        saveUninitialized: true
    };

    if (argv.memcached || process.env.MEMCACHED === 'true') {
        config.store = makeMemcachedStore();
    } else {
        log.warn('Memcached Session Store is not enabled, using MemoryStore instead!');
    }

    return session(config);
}

function makeMemcachedStore(): Store {
    const MemcachedStore = require('connect-memcached')(session);

    return new MemcachedStore({
        hosts: ['127.0.0.1:11211'],
        secret: readKey('memcached.key'),
        prefix: 'ms'
    });
}

function readKey(name: string): string {
    const keyFilePath = path.join(global.basedir, name);

    log.debug('Reading key from %s', keyFilePath);

    if (fs.existsSync(keyFilePath)) {
        return fs.readFileSync(keyFilePath).toString();
    }

    log.warn('There is no such key file: %s!', name);
    log.warn('Making random key!');

    return uuid();
}
