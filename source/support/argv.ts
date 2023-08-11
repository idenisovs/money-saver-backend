import yargs from 'yargs';
import { Arguments } from './arguments';

export default yargs
	.usage('Launch Money Saver daemon')
	.options({
		port: {
			type: 'number', default: 9001, alias: 'p', describe: 'Select port to listen',
		},
		database: { type: 'string', alias: 'b', describe: 'Select database to work with' },
		memcached: {
			type: 'boolean', default: false, alias: 'm', describe: 'Enabled memcached support',
		},
		verbose: {
			type: 'boolean', default: false, alias: 'v', describe: 'Run in Verbose mode',
		},
		debug: {
			type: 'boolean', default: false, alias: 'd', describe: 'Set log level to DEBUG',
		},
		trace: {
			type: 'boolean',
			default: false,
			alias: 't',
			describe: 'Set log level to TRACE, extra verbosity level.',
		},
		testable: { type: 'boolean', default: false, describe: 'Run daemon in Testable mode' },
	}).argv as Arguments;
