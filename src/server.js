const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.resolve(__dirname,'..', 'public')));
app.use(routes);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log(`servidor rodando em http://localhost:3000`);
})