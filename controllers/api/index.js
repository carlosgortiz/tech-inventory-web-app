const router = require('express').Router();
const hardwareRoutes = require('./hardwareRoutes');

router.use('/hardwares', hardwareRoutes);

module.exports = router;
