require('dotenv').config({path: './.env'});
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
class App {
    constructor(){
        this.connection();
        this.app = express();
        this.middlewares();
        this.routes();
    }
    connection(){
        mongoose.connect(process.env.CONNECTIONURL, { useNewUrlParser:true, useUnifiedTopology:true })
            .then(() => {
                console.log('database running');
                this.app.emit('ready');
        
            })
            .catch(e => console.log(e));
    }
    middlewares(){
        /** Sessions */
        const sessionOptions = session({
            secret:'chaveSecreta', //alterar para variavel de ambiente
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({ mongoUrl: process.env.CONNECTIONURL }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 1, //1 dia
                httpOnly: true
            }
        })
        this.app.use(sessionOptions);

        /** Modulo de sessões temporarias */
        this.app.use(flash());

        this.app.use((req,res, next) =>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            next()
        })

        /** Body Parser */
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json());

        /* Gerencia as requisições, o parametro dev retorna algumas informações 
        sobre as requisições que estão sendo feitas para a aplicação */

        this.app.use(morgan('dev'));

        /**Arquivos estáticos (css, javascript) */
        this.app.use(express.static(path.resolve(__dirname, '..', 'public')))

        this.app.set('views', path.resolve(__dirname, 'views'));
        this.app.set('view engine', 'ejs');

        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control_Allow-Headers", "Access, Content-type, Authorization, Accept, Origin, X-Requested-With");
            this.app.use(cors());
            next();
        })
    }

    routes(){
        this.app.use(routes);
    }
}

module.exports = new App().app

