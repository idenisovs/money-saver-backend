import log4js from 'log4js';
import config from '../config';

const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'off'];

function resolveLogLevel(): string {
	if (config.TRACE) {
		return 'trace';
	}

	if (config.DEBUG) {
		return 'debug';
	}

	if (config.VERBOSE) {
		return 'info';
	}

	const envLevel = config.LOGLEVEL?.trim().toLowerCase();

	if (envLevel && LOG_LEVELS.includes(envLevel)) {
		return envLevel;
	}

	return 'off';
}

const level = resolveLogLevel();

log4js.configure({
	appenders: {
		console: { type: 'console' },
	},
	categories: {
		default: { appenders: ['console'], level },
	},
});

if (level === 'trace') {
	log4js.getLogger('log').warn('Running in extra verbosity level!');
}

export default log4js;
