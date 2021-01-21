/**
 * This module configures the Log4js library.
 * Created by I. Denisovs on 16.07.2017..
 */

const log4js = require('log4js');
const argv = require('../argv');

function configure() {
    var config = {
        appenders: {
            console: { type: 'console' }
        },
        categories: {
            default: { appenders: ['console'], level: 'off' }
        }
    };

    if (argv.verbose) {
        config.categories.default.level = 'info';
    }

    if (argv.debug) {
        config.categories.default.level = 'debug';
    }

    if (argv.trace) {
        config.categories.default.level = 'trace';
    }

    log4js.configure(config);

    if (argv.trace) {
        log4js.getLogger('log').warn('Running in extra verbosity level!');
    }
}

module.exports = configure;
