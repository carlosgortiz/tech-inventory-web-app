const router = require('express').Router();

router.get('/', async (request, response) => {    
    //const loggedIn = false;  //true para cuando esta logeado para controlar el menu falso para cuando no 

    console.log('reques.session :', request.session);

    const loggedIn = request.session.loggedIn === undefined ? false : true;
    const userId = loggedIn ? request.session.userid : 0;

    //response.send('GET Home route TEST')
    /*Estructura de los mensajes */
    let messages = [];
    //messages.push({ message: " esto es una prueba : para la implementacion en las vistas" });
    /*Estructura de los mensajes */

    response.render('index',{loggedIn : loggedIn, messages : messages, userId : userId});

})

module.exports = router;