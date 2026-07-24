import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Arguments } from './arguments';

export default
	yargs(hideBin(process.argv))
	.scriptName('money-saver')
	.usage('$0 [options]')
	.options({
		port: {
			type: 'number', alias: 'p', describe: 'Select port to listen',
		},
		host: {
			type: 'string', describe: 'Select host to bind to',
		},
		database: {
			type: 'string', alias: 'b', describe: 'Select database to work with'
		},
		memcached: {
			type: 'boolean', alias: 'm', describe: 'Enable memcached support',
		},
		verbose: {
			type: 'boolean', alias: 'v', describe: 'Run in Verbose mode',
		},
		debug: {
			type: 'boolean', alias: 'd', describe: 'Set log level to DEBUG',
		},
		trace: {
			type: 'boolean',
			alias: 't',
			describe: 'Set log level to TRACE, extra verbosity level.',
		},
		testable: {
			type: 'boolean', describe: 'Run daemon in Testable mode'
		},
	}).argv as Arguments;
