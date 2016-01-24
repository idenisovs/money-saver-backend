var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var argv = require('./modules/support/argv');
var config = require('./config.json');
var log = require('./modules/support/logger').getLogger('daemon');

var app = express();

log.info('Launching daemon...');

var static = express.static(config.content.public, { index: config.index });

app.use(static);

app.use(bodyParser.json());

app.use('/api', require('./modules/api/api.js'));

if (util.isNumber(argv.port))
{
    config.port = argv.port;
}

var server = app.listen(config.port, onListen);

function onListen()
{
	log.info('Daemon started and listening on %s port', server.address().port);
}
