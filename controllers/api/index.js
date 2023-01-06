const router = require('express').Router();
const userRoutes = require('./userRoutes');
const providerRoutes = require('./providerRoutes');
const hardwareRoutes = require('./hardwareRoutes');
const softwareRoutes = require('./softwareRoutes');
const deviceRoutes = require('./deviceRoutes');

router.use('/users', userRoutes);
router.use('/providers', providerRoutes);

router.use('/hardwares', hardwareRoutes);
router.use('/softwares', softwareRoutes);
router.use('/devices', deviceRoutes);

module.exports = router;
