var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var log = require('./support/logger').getLogger('daemon');
var passport = require('./support/passport');
var argv = require('./support/argv');
var config = require('./config.json');

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
    var staticAccessControl = require('./support/middleware/static-access-control');

    var webAppDir = __dirname + '/' + config.content.public;
    log.debug('Loading static content from %s ...', webAppDir);

    var options = { index: config.index };
    var static = express.static(webAppDir, options);

    app.use(staticAccessControl, static);

    log.debug('Static content enabled!');
}

function enableRestAPI()
{
    app.use('/api', require('./api'));

    log.debug('REST API enabled!');
}