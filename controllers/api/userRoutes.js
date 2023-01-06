
const router = require('express').Router();
const { User } = require('../../models');

router.get('/login', async (request, response) => {    
    response.send('GET user login ')
    //response.render('login', {typeLogin:true});
})

module.exports = router;