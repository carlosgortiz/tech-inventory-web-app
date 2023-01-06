const router = require('express').Router();

const softwareRoutes = require('./software-routes');
router.use('/software', softwareRoutes);

module.exports = router;