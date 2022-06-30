const express = require('express');
const userRoutes = require('./src/config/userRoutes')

const server = express();

server.use(express.json())
server.use(userRoutes)

server.listen(3000, () => {
    console.log ('SERVER IS RUNNING...')
    });





