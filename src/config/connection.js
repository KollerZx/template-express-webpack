require('dotenv').config({path: './.env'});
const Mongoose = require('mongoose');


class Connection{
    constructor(){
        this.connectionMongoDB()
       
    }

    connectionMongoDB(){
        this.mongoDBConnection = Mongoose.connect(process.env.CONNECTIONURL, { useNewUrlParser:true, useUnifiedTopology:true })
        .then(() => {
            console.log('database running');
        })
        .catch(e => console.log(e));
    }
}

module.exports = new Connection();