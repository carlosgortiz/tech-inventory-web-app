const router = require('express').Router();
const { Provider } = require('../../models');

router.get('/', async (request, response) => {    
    response.send('GET provider ')    
})

module.exports = router;