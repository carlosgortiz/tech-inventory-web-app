const router = require('express').Router();
const Hardware = require('../../models/Hardware');

// GET all Hardwares
router.get('/', (req, res) => {
    // Get all hardwares from the Hardware table
    Hardware.findAll().then((HardwareData) => {
      res.json(HardwareData);
    });
  });
  
  // GET a Hardware
  router.get('/:id', (req, res) => {
    // Get one Hardware from the Hardware table
    Hardware.findOne(
      {
        // Gets the Hardware based on the id given in the request parameters
        where: { 
          id: req.params.id 
        },
      }
    ).then((HardwareData) => {
      res.json(HardwareData);
    });
  });

// CREATE a hardware
router.post('/', (req, res) => {

  Hardware.create({
    name: req.body.name,
    type: req.body.type,
    purchase_date: req.body.purchase_date,
    warranty: req.body.warranty,
    brand: req.body.brand,
    address: req.body.address,
    department: req.body.department,
    provider_id: req.body.provider_id
  })
    .then((newHardware) => {
      res.json(newHardware);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Updates Hardware based on its id
router.put('/:id', (req, res) => {
    Hardware.update(
      {
        name: req.body.name,
        type: req.body.type,
        purchase_date: req.body.purchase_date,
        warranty: req.body.warranty,
        brand: req.body.brand,
        address: req.body.address,
        department: req.body.department,
        provider_id: req.body.provider_id
      },
       {
         where: {
           id: req.params.id,
         },
       }
    )
      .then((updatedHardware) => {
        // Sends the updated hardware as a json response
        res.json(updatedHardware);
      })
      .catch((err) => res.json(err));
  });

// Delete route for a hardware with a matching id
router.delete('/:id', (req, res) => {
    Hardware.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedHardware) => {
        res.json(deletedHardware);
      })
      .catch((err) => res.json(err));
  });

module.exports = router;
