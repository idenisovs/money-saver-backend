/**
 * This module encapsulates the basic methods of opening and closing DB connections
 * and provides initialized DB connector.
 *
 * Created by Ga5Xz2 on 13.09.2015..
 */

var config = require('../../config.json');
var SQLite = require('sqlite3').Database;

console.log('Connecting to %s...', config.db);

var db = new SQLite(config.db);

module.exports = db;

console.log('%s connected!', config.db);

db.run('PRAGMA foreign_keys = ON', function(error) {
    if (error) {
        console.log(error);
        return;
    }

    console.log('Foreign key support shall be enabled now!');
});


process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);

function exitHandler()
{
    removeExitListener();

    console.log('Closing database...');

    db.close(function(err) {
        if (!err) { console.log('Done!'); }

        process.exit(0);
    });
}

function removeExitListener()
{
    process.removeListener('exit', exitHandler);
    process.removeListener('SIGINT', exitHandler);
}