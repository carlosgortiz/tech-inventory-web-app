const router = require('express').Router();

router.get('/', async (request, response) => {    
    const loggedIn = false;  //true para cuando esta logeado para controlar el menu falso para cuando no 

    //response.send('GET Home route TEST')
    /*Estructura de los mensajes */
    let messages = [];
    messages.push({ message: " esto es una prueba : para la implementacion en las vistas" });
    /*Estructura de los mensajes */

    response.render('index',{loggedIn : loggedIn, messages : messages});

})

module.exports = router;