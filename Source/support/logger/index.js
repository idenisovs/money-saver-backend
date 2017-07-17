const log4js = require('log4js');
const configure = require('./configure');
const getCallerFile = require('./get-caller-file');

configure();

function logger(name) {
    return log4js.getLogger(name || getLoggerName());
}

function getLoggerName() {
    let callerFile = getCallerFile();
    let loggerName = callerFile.replace(basedir, '');

    if (loggerName[0] === '/' || loggerName[0] === '\\') {
    	loggerName = loggerName.substring(1);
	}

    return loggerName;
}

module.exports = logger;