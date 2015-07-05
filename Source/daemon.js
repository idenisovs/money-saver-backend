var express = require('express');

var config = require('./config.json');

var app = express();

var static = express.static(config.content.public, { index: config.index });
app.use(static);

app.listen(config.port);