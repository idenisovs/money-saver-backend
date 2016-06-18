var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('./support/passport');
var argv = require('./support/argv');
var config = require('./config.json');
var log = require('./support/logger').getLogger('daemon');

var app = express();

log.info('Launching daemon...');

enable3dPartyMiddleware();

enableStaticContent();

enableRestAPI();

config.port = util.isNumber(argv.port) ? argv.port : config.port;

var server = app.listen(config.port, onListen);

function onListen()
{
	log.info('Daemon started and listening on %s port', server.address().port);
}

function enable3dPartyMiddleware()
{
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session({ secret: 'Fb75JGeUyTlEuCMp', resave: false, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());

    log.debug('3d party middleware enabled!');
}

function enableStaticContent()
{
    var staticAccessControl = require('./middleware/static-access-control');
    var static = express.static(config.content.public, { index: config.index });
    app.use(staticAccessControl, static);

    log.debug('Static content enabled!');
}

function enableRestAPI()
{
    app.use('/api', require('./api/api.js'));

    log.debug('REST API enabled!');
}