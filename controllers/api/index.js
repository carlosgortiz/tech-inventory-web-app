const router = require('express').Router();
const hardwareRoutes = require('./hardwareRoutes');
const softwareRoutes = require('./softwareRoutes');


router.use('/hardwares', hardwareRoutes);
router.use('/softwares', softwareRoutes);

module.exports = router;
