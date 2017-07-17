var log4js = require('log4js');
var appRoot = require('app-root-path');
var argv = require('../argv');

var config =
{
	levels: { '[all]': 'INFO' },
	appenders:
	[
		{ type: 'file', filename: appRoot + '/daemon.log', maxLogSize: 1048576, backups: 5 }
	]
};

if (argv.verbose)
{
	config.appenders.push({ type: 'console' });
}

if (argv.debug)
{
	config.levels['[all]'] = 'DEBUG';
}

if (argv.trace)
{
	config.levels['[all]'] = 'TRACE';
}

log4js.configure(config);

if (argv.trace)
{
	log4js.getLogger('log').warn('Running in extra verbosity level!');
}

module.exports = log4js;