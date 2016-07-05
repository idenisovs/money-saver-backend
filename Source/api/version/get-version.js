/**
 * Created by Ilya Denisov on 25.06.2016..
 */
var statusCodes = require('http-status');
var fs = require('fs');

function getVersion(req, res)
{
    fs.readFile('version', { encoding: 'utf8' }, readDone);

    function readDone(err, version)
    {
        if (err)
        {
            require('log4js').getLogger('version').error(err);

            return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ version: '0.0.0.0' });
        }

		version = version.replace(/[\r\n]/g, '');

        res.json({ version: version });
    }
}

module.exports = getVersion;
