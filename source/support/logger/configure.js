const log4js = require('log4js');
const argv = require('../argv');

const levels = [ 'fatal', 'error', 'warn', 'info', 'debug', 'trace', 'off' ];

function configure() {
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
}

module.exports = configure;
