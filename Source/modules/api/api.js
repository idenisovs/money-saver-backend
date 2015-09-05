var router = require('express').Router();

router.use('/payments', require('./payments'));

module.exports = router;

console.info('API module initiated!');
