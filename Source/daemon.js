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

var static = express.static(config.content.public, { index: config.index });

app.use(static);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'Fb75JGeUyTlEuCMp', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./api/api.js'));

if (util.isNumber(argv.port))
{
    config.port = argv.port;
}

var server = app.listen(config.port, onListen);

function onListen()
{
	log.info('Daemon started and listening on %s port', server.address().port);
}
