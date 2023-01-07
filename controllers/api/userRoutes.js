
const router = require('express').Router();
const { User } = require('../../models');

router.get('/login', async (request, response) => {    
    //response.send('GET user login render Login page')
    response.render('login', {typeLogin:true});
})


router.post('/login', async (request, response) => {    
    //response.send(`POST hacer login usr/psw ${request.body.inputUser} - ${request.body.inputPassword} `);
    let messages = [];
    try {
        const userDb = await User.findOne({
            where :{
                email : request.body.inputUser
            }
        });
        
        if (!userDb)
        {
            messages.push({ message: "Usuario no encontrado." });
            return response.render('login', {typeLogin:true, messages});
         }

        const validPassword = await userDb.checkPassword(request.body.inputPassword);
        if (!validPassword) {
            messages.push({ message: "Password incorrecto." });
            return response.render('login', {typeLogin:true, messages});            
          }
        else{
            //crear session y redirigir al home
            console.log('usuario logeado', request.body.inputUser);
            response.redirect('/');
        }
    }    
    catch ( error ) {
        console.log(error);
        response.status(500).json(error);
    }    
})

router.get('/singup', async (request, response) => {
    //response.send('GET user/SingUp render login page para registro de usuario')
    response.render('login', {typeLogin:false});

})

router.post('/singup', async (request, response) => {
    //response.send('POST user/SingUp registrar usuario y verificar que no exista')
    //response.send(`POST user/SingUp registrar usuario y verificar que no exista usr/psw ${request.body.inputUser} - ${request.body.inputPassword} `);
    let messages = [];
    try {

        const exists = await User.findOne({
            where :{
                email : request.body.inputUser
            }
        });
        
        if (!!exists)
        {
            messages.push({ message: `El usuario ${request.body.inputUser} ya se encuentra registrado.`});
            return response.render('login', {typeLogin:true, messages});
         }

    }
    catch ( error ){
        console.log(error);
        response.status(500).json(error);
    }

    //Agregar las validaciones necesarias y generar los msgs del front
    if (request.body.inputPassword.length < 4){
        messages.push({ message: `La contraseña requiere un minimo de 4 caracteres.`});
    }
    if (messages.length > 0 ) {
        return response.render('login', {typeLogin:false, messages});
    }

    //Crear usuario si han sucedido las validaciones
    const newUser = await User.create({
                                            email: request.body.inputUser,
                                            password: request.body.inputPassword
                                        });
                                        console.log('nuevo usuaro', newUser);
                                        console.log('nuevo !!', !!newUser);
    //crear session y redirigir al home
    response.redirect('/');
})

router.get('/logout', async (request, response) => {
    response.send('GET user/logout cerrar session del  usuario.')
})


module.exports = router;