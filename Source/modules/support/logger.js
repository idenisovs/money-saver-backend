var argv = require('../../argv.js');
var log4js = require('log4js');

log4js.configure('logger.json', {});

var consoleAppender = log4js.appenders.console();

if (argv.v === 1)
{
	var infoAppender = log4js.appenders.logLevelFilter("INFO", "FATAL", consoleAppender);

	log4js.addAppender(infoAppender);
}

if (argv.v > 1)
{
	console.log('extra verbose level');
	
	var traceAppender = log4js.appenders.logLevelFilter("TRACE", "FATAL", consoleAppender);

	log4js.addAppender(traceAppender);
}

module.exports = log4js;