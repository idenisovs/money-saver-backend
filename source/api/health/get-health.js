/**
 * Created by Ilya Denisov on 12.03.2016..
 */

var ms = require('ms');

var timestamp = 0;

updateTimestamp();

function updateTimestamp()
{
    timestamp = Date.now();

    setTimeout(updateTimestamp, ms('5s'));
}

function makeHealthResponse(req, res)
{
    res.json({ timestamp: timestamp });
}

module.exports = makeHealthResponse;