const router = require('express').Router();
<<<<<<< HEAD

const softwareRoutes = require('./software-routes');
router.use('/software', softwareRoutes);

module.exports = router;
=======
const hardwareRoutes = require('./hardwareRoutes');

router.use('/hardwares', hardwareRoutes);

module.exports = router;
>>>>>>> 484d1b5a596d6ad8db4eca4911d04e5d9c3320c8
