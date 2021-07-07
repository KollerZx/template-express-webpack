const { Router } = require('express');
const routes = Router();

routes.get('/', (req, res) => {
    res.render('index');
})
module.exports = routes;
