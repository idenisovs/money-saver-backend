global['basedir'] = __dirname;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const log = require('./support/logger')('daemon');
const passport = require('./support/passport');
const argv = require('./support/argv');
const config = require('../config.json');

const app = express();

log.info('Launching daemon...');

enable3dPartyMiddleware();

enableStaticContent();

enableRestAPI();

const spaFile = path.join(__dirname, config.content.public, config.index);

app.get('/*', (req, res) => res.sendFile(spaFile));

config.port = argv.port || config.port;

const server = app.listen(config.port, onListen);

function onListen() {
    log.info('Daemon started and listening on http://localhost:%s', server.address().port);
}

function enable3dPartyMiddleware() {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session(makeSessionConfig()));
    app.use(passport.initialize());
    app.use(passport.session());

    log.debug('3d party middleware enabled!');
}

function enableStaticContent() {
    const webAppDir = path.join(__dirname, config.content.public);
    log.debug('Loading static content from %s ...', webAppDir);

    const options = {index: config.index};
    const staticContent = express.static(webAppDir, options);

    app.use(staticContent);

    log.debug('Static content enabled!');
}

function enableRestAPI() {
    app.use('/api', require('./api'));

    log.debug('REST API enabled!');
}

function makeSessionConfig() {

    const sessionConfig = {
        secret: 'Fb75JGeUyTlEuCMp',
        resave: false,
        saveUninitialized: true
    };

    if (config.memcached.enabled) {
        enableMemcachedSessionStore(sessionConfig);
    } else {
        log.warn('Memcached Session Store is not enabled, using MemoryStore instead!');
    }

    return sessionConfig;
}

function enableMemcachedSessionStore(sessionConfig) {
    const MemcachedStore = require('connect-memcached')(session);
    sessionConfig.store = new MemcachedStore(config.memcached);
    log.debug('Memcached Session Store support is enabled!');
}
