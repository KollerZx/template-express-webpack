require('dotenv').config({path: './.env'});
const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTIONURL, { useNewUrlParser:true, useUnifiedTopology:true })
    .then(() => {
        console.log('database running');
        app.emit('ready');
        
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');   


app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.resolve(__dirname,'..', 'public')));

const sessionOptions = session({
    secret:'chaveSecreta',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONURL }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1,
        httpOnly: true
    }
})

app.use(sessionOptions);
app.use(flash());
app.use(routes);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.on('ready', () =>{
    app.listen(3000, () => {
        console.log(`servidor rodando em http://localhost:3000`);
    })
})
