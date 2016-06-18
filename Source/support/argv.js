/**
 * Created by Ga5Xz2 on 02.01.2016..
 */

var argv = require('yargs')
    .usage('Usage: $0 [options]')
    .alias('p', 'port')
    .describe('p', 'Select the port to listen')
    .alias('b', 'database')
    .string('b')
    .describe('b', 'Select the database to working with')
	.boolean('v')
	.alias('v', 'verbose')
	.describe('v', 'Verbose mode, shows output to console')
	.boolean('d')
	.alias('d', 'debug')
	.describe('d', 'Set log level to DEBUG')
	.boolean('t')
	.alias('t', 'trace')
	.describe('t', 'Set log level to TRACE, extra verbosity level.')
    .help('h')
    .alias('h', 'help')
    .argv;

module.exports = argv;