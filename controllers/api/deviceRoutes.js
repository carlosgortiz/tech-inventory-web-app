const router = require('express').Router();
const { DevicePackage } = require('../../models');

// GET all devices
router.get('/', async (req, res) => {
    try {
      const deviceData = await DevicePackage.findAll({
        include: [{ model: Hardware }, { model: Software }],
      });
      res.status(200).json(deviceData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET a single device
  router.get('/:id', async (req, res) => {
    try {
      const deviceData = await DevicePackage.findByPk(req.params.id, {
        include: [{ model: Hardware }, { model: Software }],
      });
  
      if (!deviceData) {
        res.status(404).json({ message: 'No device found with that id!' });
        return;
      }
  
      res.status(200).json(deviceData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;