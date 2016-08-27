/**
 * Created by Ilya Denisov on 25.06.2016..
 */
var statusCodes = require('http-status');
var fs = require('fs');
var path = require('path');
var log = require('log4js').getLogger('version');

function getVersion(req, res)
{
    var baseDir = path.dirname(require.main.filename);

    fs.readFile(baseDir + '/version', { encoding: 'utf8' }, readDone);

    function readDone(err, version)
    {
        if (err)
        {
            log.error(err);

            return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ version: '0.0.0.0' });
        }

		version = version.replace(/[\r\n]/g, '');

        res.json({ version: version });
    }
}

module.exports = getVersion;
