/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var bl = require('../../bl/bl');

module.exports = getPaymentsByInterval;

function getPaymentsByInterval(req, res)
{
    res.json({ message: 'getPaymentsByInterval', intervalId: req.params.id });
}