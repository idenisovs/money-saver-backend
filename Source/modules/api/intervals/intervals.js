/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var router = require('express').Router();
var states = require('../../util/http.states.js');

router.get('/', getIntervals);
router.post('/', createInterval);
router.get('/latest', getLatestInterval);
router.get('/:id', getIntervalById);
router.get('/:id/payments', getPaymentsByInterval);

module.exports = router;

function getIntervals(req, res)
{
    res.json({ message: 'getIntervals' });
}

function getLatestInterval(req, res)
{
    res.json({ message: 'getLatestInterval' });
}

function getIntervalById(req, res)
{
    res.json({ message: 'getIntervalById', intervalId: req.params.id });
}

function getPaymentsByInterval(req, res)
{
    res.json({ message: 'getPaymentsByInterval', intervalId: req.params.id });
}

function createInterval(req, res)
{
    res.json({ message: 'createInterval' });
}