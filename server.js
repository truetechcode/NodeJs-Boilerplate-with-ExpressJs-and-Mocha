const server = require('./configs/app')();
const config = require('./configs/config/config');

//create the basic server setup 
server.create(config);

//start the server
server.start();

module.exports = server; //For test runner use