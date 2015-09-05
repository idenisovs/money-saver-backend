/**
  * Intervals REST API endpoint
  */

var router = require('express').Router();

router.get('/', hello);

module.exports = router;

function hello(req, res)
{
	var response = { 
		message1: 'Hello, world!',
		message2: 'I`m Intervals API'
	};

	res.json(response);
}
