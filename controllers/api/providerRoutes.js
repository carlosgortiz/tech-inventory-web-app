const router = require('express').Router();
const { Provider } = require('../../models');
const appAuth = require('../../utils/appAuth');


//Render del formulario 
router.get('/new', appAuth,  async (request, response) => {    
    const loggedIn = !!request.session.loggedIn ;
    response.render('providerpage',{loggedIn, newProvider:true});
    return;
})


router.get('/list', appAuth, async (request, response) => {    
    //response.send('GET provider ')    
    const listProvider = await Provider.findAll({
        attributes : ['id','name', 'email','tel'],
        order : [['name', 'DESC']]
    });
    console.log('listProvider', listProvider);

    const providerRows = listProvider.map(rows => rows.get ({plain:true}));
    console.log ('provider rows', providerRows);
    const loggedIn = !!request.session.loggedIn ;
    //response.status(200).json(providerRows);
    response.render('provider',{loggedIn, providerRows})
    return;
})


router.get('/:id', appAuth, async (request, response) => {    
    //response.send('PUT provider ')    
    try {
        const rowProvider = await Provider.findOne({
            where : {
                id : request.params.id
            }
        },
        );

        if (!!rowProvider){
            const loggedIn = !!request.session.loggedIn ;
            response.render('providerpage', {loggedIn: loggedIn, newProvider:false, id: rowProvider.id, name: rowProvider.name, email : rowProvider.email, tel : rowProvider.tel});        
        }
    }
    catch ( error ){
        response.status(500).json(error);
    }
    return;
})

//Registro del nuevo provider
router.post('/', appAuth, async (request, response) => {    
    //response.send('POST provider ')    
    try {
        const newProvider = await Provider.create({
            name    : request.body.inputName,
            email   : request.body.inputEmail,
            tel     : request.body.inputTel
        });
        response.redirect('/api/providers/list')

    }
    catch ( error ){
        response.status(500).json(error);
    }

})

router.delete('/:id', appAuth, async (request, response) => {    
    //response.send('DELETE provider ')    
    /*Ded
     */
    try {
        const rowProvider = await Provider.destroy({
            where : {
                id : request.params.id
            }
        })

        if (!rowProvider){
            response.status(404).json({code : 404, message : 'No se encontro registro.', data : []});            
        }
        else{
            response.status(200).json({code : 200, message : 'Registro eliminado.', data : [rowProvider]});            
        }        
    }

    catch ( error ){
        response.status(500).json(error);
    }
    return;
})


router.put('/:id', appAuth, async (request, response) => {    
    //response.send('PUT provider ')    
    try {
        const rowProvider = await Provider.update({
            name : request.body.name,
            email : request.body.email,
            tel : request.body.tel
        },
        {
            where : {
                id : request.params.id
            }
        }
        );

        if (!rowProvider){
            response.status(404).json({code : 404, message : 'No se encontro registro.', data : []});            
        }
        else{
            response.status(200).json({code : 200, message : 'Registro actualizado.', data : [rowProvider]});            
        }        

    }
    catch ( error ){
        response.status(500).json(error);
    }
    return;
})

module.exports = router;