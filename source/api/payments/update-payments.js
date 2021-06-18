const log = require('log4js').getLogger('update-payments');
const http = require('http-status');
const bl = require('../../bl').default;

function updatePayments(req, res)
{
    log.debug('Called!');

    req.body.user = req.user;

    bl.payments.update(req.body, success, fail);

    function success(result)
    {
        log.debug('Success!');
        res.json({ updated: result.length });
    }

    function fail(err)
    {
        log.error(err);
        res.status(http.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = updatePayments;
