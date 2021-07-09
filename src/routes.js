const routes = require('express').Router();
const homeController = require('./controllers/homeController')


routes.get('/', homeController.index);
module.exports = routes;
