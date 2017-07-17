/**
 * Created by I. Denisovs on 16.07.2017..
 */

const path = require('path');

function getCallerFile() {
    var originalFunc = Error.prepareStackTrace;

    let callerfile;

    try {
        var err = new Error();

        Error.prepareStackTrace = function (err, stack) { return stack; };

        let currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if (path.dirname(currentfile) !== path.dirname(callerfile)) {
                break;
            }
        }
    } catch (e) {}

    Error.prepareStackTrace = originalFunc;

    return callerfile;
}

module.exports = getCallerFile;