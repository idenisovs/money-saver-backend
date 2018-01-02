/**
 * This module configures the Log4js library.
 * Created by I. Denisovs on 16.07.2017..
 */

const appRoot = require('app-root-path');
const log4js = require('log4js');
const argv = require('../argv');

function configure() {
    var config = {
        appenders: {
            console: { type: 'console' }
        },
        categories: { default: { appenders: ['console'], level: 'debug' } }
    };

    if (argv.verbose)
    {
    }

    if (argv.debug)
    {
    }

    if (argv.trace)
    {
    }

    log4js.configure(config);

    if (argv.trace) {
        log4js.getLogger('log').warn('Running in extra verbosity level!');
    }
}

module.exports = configure;