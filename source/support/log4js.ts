import log4js from 'log4js';
import argv from './argv';

const levels = [ 'fatal', 'error', 'warn', 'info', 'debug', 'trace', 'off' ];

let verbosity = 'off';

if (process.env.LOGLEVEL && levels.indexOf(process.env.LOGLEVEL.trim().toLowerCase())) {
	verbosity = process.env.LOGLEVEL.trim().toLowerCase();
}

if (argv.verbose) {
	verbosity = 'info';
}

if (argv.debug) {
	verbosity = 'debug';
}

if (argv.trace) {
	verbosity = 'trace';
}

const config = {
	appenders: {
		console: { type: 'console' }
	},
	categories: {
		default: { appenders: ['console'], level: verbosity }
	}
};

log4js.configure(config);

if (verbosity === 'trace') {
	log4js.getLogger('log').warn('Running in extra verbosity level!');
}

export default log4js;
