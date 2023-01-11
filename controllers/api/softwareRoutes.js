const router = require('express').Router();
const appAuth = require('../../utils/appAuth');
const { Provider, Software } = require('../../models');

//Render del formulario 
router.get('/new', appAuth, async (request, response) => {
    const loggedIn = !!request.session.loggedIn;
    response.render('softwarepage', { loggedIn, newSoftware: true });
    return;
})

// GET all Softwares
router.get('/list', appAuth, async (req, res) => {
    const listSoftwares = await Software.findAll({
        attributes: ['id', 'name', 'purchase_date', 'warranty'],
        include: [Provider],
        order: [['id', 'DESC']]
    });
    const softwaresData = listSoftwares.map(software => software.get({ plain: true }));
    const loggedIn = !!req.session.loggedIn;
    res.render('software', { loggedIn, softwaresData });
});

// GET a Software
router.get('/:id', appAuth, async (req, res) => {
    try {
        // Get one Software from the Software table
        const softwareData = await Software.findByPk(req.params.id, {
            where: {
                id: req.params.id
            },
            include: [Provider],
        });
        if (!softwareData) {
            res.status(404).json({ message: 'No existe software con ese id!' });
            return;
        }
        const loggedIn = !!req.session.loggedIn;
        const software = softwareData.get({ plain: true });
        res.render('softwarepage', { loggedIn: loggedIn, newSoftware: false, id: software.id, name: software.name, purchase_date: software.purchase_date, warranty: software.warranty, provider: software.provider.name });
    }
    catch (error) {
        res.status(500).json(error);
    };
});


// CREATE a Software
router.post('/', appAuth, async (req, res) => {
    try {
        const newSoftware = await Software.create({
            name: req.body.inputName,
            purchase_date: req.body.inputPurchaseDate,
            warranty: req.body.inputWarranty,
            provider_id: req.body.inputProvider
        });
        res.redirect('/api/softwares/list')

    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Updates Software based on its id
router.put('/:id', appAuth, async (req, res) => {
    try {
        const updatedSoftware = await Software.update(
            {
                name: req.body.name,
                purchase_date: req.body.purchase_date,
                warranty: req.body.warranty,
                provider_id: req.body.provider_id
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!updatedSoftware) {
            res.status(404).json({ code: 404, message: 'No se encontro registro.', data: [] });
        }
        else {
            res.status(200).json({ code: 200, message: 'Registro actualizado.', data: [updatedSoftware] });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// Delete route for a Software with a matching id
router.delete('/:id', appAuth, async (req, res) => {
    try {
        const deletedSoftware = await Software.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedSoftware) {
            res.status(404).json({ code: 404, message: 'No se encontro registro.', data: [] });
        }
        else {
            res.status(200).json({ code: 200, message: 'Registro eliminado.', data: [deletedSoftware] });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
    return;
});

module.exports = router;
