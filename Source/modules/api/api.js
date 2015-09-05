var router = require('express').Router();

router.use('/payments', require('./payments'));

router.use('/intervals', require('./intervals'));

module.exports = router;

console.info('API module initiated!');
