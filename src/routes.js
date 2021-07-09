const routes = require('express').Router();
const homeController = require('./controllers/homeController')


routes.get('/', homeController.index);

routes.post('/', (req, res) =>{
    res.send('Formulario enviado')
})


module.exports = routes;
