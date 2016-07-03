/**
 * Created by I.Denisovs on 16.3.7.
 */

var statusCode = require('http-status');
var log = require('log4js').getLogger('payments-summary');
var bl = require('../../bl/bl');

function getPaymentsSummary(req, res)
{
    var request = { user: req.user };

    if (req.query.intervalid)
    {
        request.intervalId = req.query.intervalid;
    }

    log.trace(request);

    bl.summary.payments(request, success, fail);

    function success(summary)
    {
        res.json(summary);
    }

    function fail(err)
    {
        log.error(err);

        var status;

        switch(err)
        {
            case 'Interval not found!':
                status = statusCode.NOT_FOUND;
                err = { err: err };
                break;
            default:
                status = statusCode.INTERNAL_SERVER_ERROR;
        }

        res.status(status).json(err);
    }
}

module.exports = getPaymentsSummary;