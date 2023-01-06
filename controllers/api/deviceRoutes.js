const router = require('express').Router();
const { DevicePackage } = require('../../models');

router.get('/', async (request, response) => {    
    response.send('GET DevicePAckage route ')
})

module.exports = router;