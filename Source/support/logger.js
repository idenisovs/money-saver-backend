var argv = require('./argv');
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
	var traceAppender = log4js.appenders.logLevelFilter("TRACE", "FATAL", consoleAppender);

	log4js.addAppender(traceAppender);

	log4js.getLogger('log').info('Extra verbose level!');
}

module.exports = log4js;