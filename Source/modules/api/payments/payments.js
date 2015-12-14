/**
  * Payments REST API endpoint
  */

var router = require('express').Router();

router.get('/', getPayments);

router.get('/:date', getPaymentsByDate);

module.exports = router;

function getPayments(req, res)
{
    res.json({ message: 'getPayments' });
}

function getPaymentsByDate(req, res)
{
    var date = req.params.date;

    res.json({ date: date, message: 'getPaymentsByDate' });
}
