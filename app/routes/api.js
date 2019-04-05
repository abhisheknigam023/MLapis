const router = require('express').Router();

router.use('/videos', require('./videoRoute'));

module.exports = router;