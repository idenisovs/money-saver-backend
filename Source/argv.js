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
	.count('v')
	.alias('v', 'verbose')
	.describe('v', 'Verbose mode. Type -vv for extra verbosity.')
    .help('h')
    .alias('h', 'help')
    .argv;

module.exports = argv;