const express = require('express')
const app = express()
require('dotenv').config({path: './config/confi6g.env'})
const config = require('./config/config.js');


    const PORT = process.env.PORT || config.app.port || 5000;
    const NODE_ENV = process.env.PORT || config.app.node_env;

const server = app.listen(PORT, () => {
    console.log(`Server started in ${NODE_ENV} envirement on port: ${PORT}`);
});

