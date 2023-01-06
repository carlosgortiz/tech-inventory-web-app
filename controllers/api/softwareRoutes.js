const router = require('express').Router();
const Software = require('../../models/Software');

// GET all Softwares
router.get('/', (req, res) => {
    // Get all softwares from the Software table
    Software.findAll().then((SoftwareData) => {
        res.json(SoftwareData);
    });
});

// GET a Software
router.get('/:id', (req, res) => {
    // Get one Software from the Software table
    Software.findOne(
        {
            // Gets the Software based on the id given in the request parameters
            where: {
                id: req.params.id
            },
        }
    ).then((SoftwareData) => {
        res.json(SoftwareData);
    });
});

// CREATE a Software
router.post('/', (req, res) => {

    Software.create({
        name: req.body.name,
        type: req.body.type,
        purchase_date: req.body.purchase_date,
        warranty: req.body.warranty,
        brand: req.body.brand,
        address: req.body.address,
        department: req.body.department,
        provider_id: req.body.provider_id
    })
        .then((newSoftware) => {
            res.json(newSoftware);
        })
        .catch((err) => {
            res.json(err);
        });
});

// Updates Software based on its id
router.put('/:id', (req, res) => {
    Software.update(
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
        .then((updatedSoftware) => {
            // Sends the updated Software as a json response
            res.json(updatedSoftware);
        })
        .catch((err) => res.json(err));
});

// Delete route for a Software with a matching id
router.delete('/:id', (req, res) => {
    Software.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((deletedSoftware) => {
            res.json(deletedSoftware);
        })
        .catch((err) => res.json(err));
});

module.exports = router;
