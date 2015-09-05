/**
  * Payments REST API endpoint
  */

var router = require('express').Router();

router.get('/', hello);

module.exports = router;

function hello(req, res)
{
	var response = { message: 'Hello, world!' };

	res.json(response);
}
