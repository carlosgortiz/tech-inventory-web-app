
const router = require('express').Router();
const { User } = require('../../models');

router.get('/login', async (request, response) => {    
    //response.send('GET user login render Login page')
    response.render('login', {typeLogin:true});
})


router.post('/login', async (request, response) => {    
    response.send(`POST hacer login usr/psw ${request.body.inputUser} - ${request.body.inputPassword} `);
})

router.get('/singup', async (request, response) => {
    response.send('GET user/SingUp render login page para registro de usuario')
})

router.post('/singup', async (request, response) => {
    response.send('POST user/SingUp registrar usuario y verificar que no exista')
})

router.get('/logout', async (request, response) => {
    response.send('GET user/logout cerrar session del  usuario.')
})


module.exports = router;