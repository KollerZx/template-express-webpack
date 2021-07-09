require('dotenv').config({path: './.env'});
const app = require('./app');
const PORT = process.env.PORT || 3000


app.on('ready', () => {
    app.listen(PORT, () => {
        console.log(`servidor rodando em http://localhost:3000`);
    })
})


