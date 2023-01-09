const router = require('express').Router();
const { Provider } = require('../../models');
const appAuth = require('../../utils/appAuth');

router.get('/', appAuth, async (request, response) => {    
    response.send('GET provider ')    
})

module.exports = router;