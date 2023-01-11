const router = require('express').Router();
const { Hardware } = require('../../models');
const appAuth = require('../../utils/appAuth');

//Render del formulario 
router.get('/new', appAuth, async (request, response) => {    
  const loggedIn = !!request.session.loggedIn;
  response.render('hardwarepage',{loggedIn, newHardware:true});
  return;
});
  
router.get('/list', appAuth, async (request, response) => {       
  const listHardware = await Hardware.findAll({
      attributes : ['id','name', 'purchase_date','warranty', 'brand', 'address', 'department', 'provider_id'],
      order : [['name', 'DESC']]
  });

  const hardwareRows = listHardware.map(rows => rows.get ({plain:true}));
  const loggedIn = !!request.session.loggedIn ;
  response.render('hardware',{loggedIn, hardwareRows})
  return;
});

router.get('/:id', appAuth, async (request, response) => {       
  try {
      const rowHardware = await Hardware.findOne({
          where : {
              id : request.params.id
          }
      },
      );

      if (!!rowHardware){
          const loggedIn = !!request.session.loggedIn ;
          response.render('hardwarepage', {loggedIn: loggedIn, newHardware:false, id: rowHardware.id, name: rowHardware.name, 
          purchase_date : rowHardware.purchase_date, warranty : rowHardware.warranty, brand : rowHardware.brand, address : rowHardware.address,
          department : rowHardware.department, provider_id : rowHardware.provider_id});        
      }
  }
  catch ( error ){
      response.status(500).json(error);
  }
  return;
});

//Registro del nuevo hardware
router.post('/', appAuth,  async (request, response) => {       
  try {
      const newHardware = await Hardware.create({
        name: request.body.inputName,
        purchase_date: request.body.inputDate,
        warranty: request.body.inputWarranty,
        brand: request.body.inputBrand,
        address: request.body.inputAddress,
        department: request.body.inputDepartment,
        provider_id: request.body.inputProvider
      });
      response.redirect('/api/hardwares/list')
  }
  catch ( error ){
      response.status(500).json(error);
  }
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
