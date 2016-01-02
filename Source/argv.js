/**
 * Created by Ga5Xz2 on 02.01.2016..
 */

var argv = require('yargs')
    .usage('Usage: $0 [options]')
    .alias('p', 'port')
    .describe('p', 'Select the port to listen')
    .alias('b', 'database')
    .describe('b', 'Select the database to working with')
    .help('h')
    .alias('h', 'help')
    .argv;

module.exports = argv;