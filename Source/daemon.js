var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config.json');

var app = express();

console.info('Launching daemon...');

var static = express.static(config.content.public, { index: config.index });

app.use(static);

app.use(bodyParser.json());

app.use('/api', require('./modules/api/api.js'));

app.listen(config.port);

console.info('Daemon started and listening on %s port', config.port);
