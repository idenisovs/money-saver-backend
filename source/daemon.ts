import path from 'path';

require('dotenv').config({
    path: path.join(__dirname, '.env')
});

global['basedir'] = __dirname;

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import log4js from './support/log4js';
const passport = require('./support/passport');
const argv = require('./support/argv');
const session = require('./support/session').default;

const log = log4js.getLogger('daemon');

const app = express();

log.info('Starting application...');

enable3dPartyMiddleware();

enableRestAPI();

enableStaticContent();

const PORT = argv.port || process.env.PORT || 9001;

app.listen(PORT, () => {
    log.info('Application is up and running on http://localhost:%s', PORT);
});

function enable3dPartyMiddleware() {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session());
    app.use(passport.initialize());
    app.use(passport.session());

    log.debug('3d party middleware enabled!');
}

function enableStaticContent() {
    const staticPath = path.join(__dirname, 'web');

    log.debug('Loading static content from %s ...', staticPath);

    app.use(express.static(staticPath));

    const indexFile = path.join(staticPath, 'index.html');

    app.get('/*', (req: Request, res: Response) => res.sendFile(indexFile));

    log.debug('Static content enabled!');
}

function enableRestAPI() {
    app.use('/api', require('./api'));

    log.debug('REST API enabled!');
}
