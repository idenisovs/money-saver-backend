/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var router = require('express').Router();
var states = require('../http.states.js');
var bl = require('../../bl/bl');

router.get('/', getIntervals);
router.post('/', createInterval);
router.get('/latest', getLatestInterval);
router.get('/latest/summary', getLatestIntervalSummary);
router.get('/:id', getIntervalById);
router.delete('/:id', deleteInterval);
router.get('/:id/payments', getPaymentsByInterval);

module.exports = router;

function getIntervals(req, res)
{
    var from = req.query.from ? req.query.from : null;
    var till = req.query.till ? req.query.till : null;
    var time = req.query.timestamp ? req.query.timestamp : null;

    console.log(req.query);

    if (time)
    {
        bl.intervals.getByTime(time, success, error);
    }
    else
    {
        res.json({ message: 'getIntervalsAvailable', from: from, till: till });
    }

    function success(interval)
    {
        res.json(interval);
    }

    function error(err)
    {
        res.status(states.InternalError).json({ err: err });
    }
}

function getLatestInterval(req, res)
{
    bl.intervals.getLatest(success, error);

    function success(interval)
    {
        res.json(interval);
    }

    function error(err)
    {
        res.status(states.InternalError).json({ err: err });
    }
}

function getLatestIntervalSummary(req, res)
{
    bl.intervals.getLatestSummary(success, error);

    function success(interval)
    {
        res.json(interval);
    }

    function error(err)
    {
        res.status(states.InternalError).json({ err: err });
    }
}

function getIntervalById(req, res)
{
    bl.intervals.getById(req.params.id, success, error);

    function success(interval)
    {
        res.json(interval);
    }

    function error(err)
    {
        res.status(states.InternalError).json({ err: err });
    }
}

function getPaymentsByInterval(req, res)
{
    res.json({ message: 'getPaymentsByInterval', intervalId: req.params.id });
}

function createInterval(req, res)
{
    bl.intervals.create(req.body, success, error);

    function success(interval)
    {
        res.json(interval);
    }

    function error(err)
    {
        if (err.reason === 'param')
        {
            res.status(states.BadRequest);
        }
        else
        {
            res.status(states.InternalError);
        }

        res.json(err);
    }
}

function deleteInterval(req, res)
{
    bl.intervals.delete(req.params.id, success, error);

    function success(result)
    {
        res.json(result);
    }

    function error(err)
    {
        if (err.reason === 'param')
        {
            res.status(states.NotFound);
        }
        else
        {
            res.status(states.InternalError);
        }

        res.json(err);
    }
}