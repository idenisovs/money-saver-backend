var express = require('express');

var config = require('./config.json');

var app = express();

var static = express.static(config.content.public, { index: config.index });

console.info('Launching daemon...');

app.use(static);

app.use('/api', require('./modules/api/api.js'));

app.listen(config.port);

console.info('Daemon started and listening on %s port', config.port);
